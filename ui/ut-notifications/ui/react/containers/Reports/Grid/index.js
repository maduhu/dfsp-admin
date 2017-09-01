import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SimpleGrid } from 'ut-front-react/components/SimpleGrid'
import Text from 'ut-front-react/components/Text'
import DateFormatter from 'ut-front-react/containers/DateFormatter'

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

class NotificationsReportsGrid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
  }

  removeEmpty (obj) {
    Object.keys(obj).forEach((key) => {
      let val = obj[key]
      if (val && typeof val === 'object') this.removeEmpty(val)
      else if (val === null || val === '') delete obj[key]
    })
    return obj
  }

  componentWillMount () {
    this.props.actions.fetchReports()
  }

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
      changeFieldVisibility
    } = this.props.actions

    return (
      <SimpleGrid
        transformCellValue={this.handleTransformCellValue}
        handleCellClick={toggleRowCheck}
        toggleColumnVisibility={changeFieldVisibility}
        rowsChecked={rowsChecked}
        emptyRowsMsg={<Text>No result</Text>}
        globalMenu
        fields={fields}
        data={data}
      />
    )
  }
};

NotificationsReportsGrid.propTypes = propTypes

NotificationsReportsGrid.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => ({
  changeId:
    state.notificationsReportsFilterByStatus.get('changeId') +
    state.notificationsReportsFilterByTemplate.get('changeId') +
    state.notificationsReportsFilterByDestination.get('changeId') +
    state.notificationsReportsFilterByDate.get('changeId'),
  fields: state.notificationsReportsGrid.get('fields').toJS(),
  data: state.notificationsReportsGrid.get('data').toJS(),
  rowsChecked: state.notificationsReportsGrid.get('rowsChecked').toJS(),
  filters: {
    notificationId: null,
    templateId: state.notificationsReportsFilterByTemplate.get('templateId'),
    statusId: state.notificationsReportsFilterByStatus.get('statusId'),
    destination: state.notificationsReportsFilterByDestination.get('destination'),
    from: state.notificationsReportsFilterByDate.get('startDate'),
    to: state.notificationsReportsFilterByDate.get('endDate'),
    pageSize: null,
    pageNumber: null
  }
})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsReportsGrid)
