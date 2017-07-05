import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SimpleGrid } from 'ut-front-react/components/SimpleGrid'
import Text from 'ut-front-react/components/Text'
import DateFormatter from 'ut-front-react/containers/DateFormatter';

import * as actions from './actions'

const propTypes = {
  // mapStateToProps
  changeId: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      visible: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      createdOn: PropTypes.string,
      destination: PropTypes.string,
      notificationId: PropTypes.number,
      statusId: PropTypes.number,
      statusName: PropTypes.string,
      templateId: PropTypes.number,
      updatedOn: PropTypes.string
    })
  ).isRequired,
  rowsChecked: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      createdOn: PropTypes.string,
      destination: PropTypes.string,
      notificationId: PropTypes.number,
      statusId: PropTypes.number,
      statusName: PropTypes.string,
      templateId: PropTypes.number,
      updatedOn: PropTypes.string
    })
  ).isRequired,
  // mapDispathToProps
  actions: PropTypes.shape({
    changeFieldVisibility: PropTypes.func.isRequired,
    toggleRowCheck: PropTypes.func.isRequired,
    toggleHeaderCheckAll: PropTypes.func.isRequired,
    toggleRowCheckboxCheck: PropTypes.func.isRequired,
    fetchReports: PropTypes.func.isRequied
  }).isRequired
}

const contextTypes = {}

class SMSReportsGrid extends Component {
  constructor (props) {
    super(props)
    props.actions.fetchReports()
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
  }

  removeEmpty (obj) {
    Object.entries(obj).forEach(([key, val]) => {
      if (val && typeof val === 'object') this.removeEmpty(val)
      else if (val === null) delete obj[key]
    })
    return obj
  };

  componentWillReceiveProps (newProps) {
    if (this.props.changeId !== newProps.changeId) {
      let filters = this.removeEmpty(newProps.filters)
      this.props.actions.fetchReports(filters)
    }
  }

  handleTransformCellValue (value, field, data, isHeader) {
    if (isHeader) {
      return <Text>{value}</Text>
    } else if (field.name === 'status') {
      return data.statusName
    } else if (field.name === 'createdOn' || field.name === 'updatedOn') {
      return (<DateFormatter>{value}</DateFormatter>)
    }
    return value
  }

  render () {
    const {
      fields,
      data,
      rowsChecked
    } = this.props

    const {
      toggleRowCheck,
      toggleHeaderCheckAll,
      changeFieldVisibility,
      toggleRowCheckboxCheck
    } = this.props.actions

    return (
      <SimpleGrid
        transformCellValue={this.handleTransformCellValue}
        handleCellClick={toggleRowCheck}
        handleCheckboxSelect={toggleRowCheckboxCheck}
        handleHeaderCheckboxSelect={toggleHeaderCheckAll}
        toggleColumnVisibility={changeFieldVisibility}
        rowsChecked={rowsChecked}
        emptyRowsMsg={<Text>No result</Text>}
        multiSelect
        globalMenu
        fields={fields}
        data={data}
      />
    )
  }
};

SMSReportsGrid.propTypes = propTypes

SMSReportsGrid.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => {
  return {
    changeId: state.smsReportsFilterByStatus.get('changeId'),
    fields: state.smsReportsGrid.get('fields').toJS(),
    data: state.smsReportsGrid.get('data').toJS(),
    rowsChecked: state.smsReportsGrid.get('rowsChecked').toJS(),
    filters: {
      notificationId: null,
      templateId: null,
      statusId: state.smsReportsFilterByStatus.get('statusId'),
      destination: null,
      from: null,
      to: null,
      pageSize: null,
      pageNumber: null
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SMSReportsGrid)
