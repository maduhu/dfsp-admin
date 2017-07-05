import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SimpleGrid } from 'ut-front-react/components/SimpleGrid'
import Text from 'ut-front-react/components/Text'

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
      templateId: PropTypes.number,
      name: PropTypes.string,
      channelId: PropTypes.number,
      operationId: PropTypes.number,
      targetId: PropTypes.number,
      content: PropTypes.string
    })
  ).isRequired,
  rowsChecked: PropTypes.arrayOf(
    PropTypes.shape({
      templateId: PropTypes.number,
      name: PropTypes.string,
      channelId: PropTypes.number,
      operationId: PropTypes.number,
      targetId: PropTypes.number,
      content: PropTypes.string
    })
  ).isRequired,
  // mapDispathToProps
  actions: PropTypes.shape({
    changeFieldVisibility: PropTypes.func.isRequired,
    toggleRowCheck: PropTypes.func.isRequired,
    toggleHeaderCheckAll: PropTypes.func.isRequired,
    toggleRowCheckboxCheck: PropTypes.func.isRequired,
    fetchTemplates: PropTypes.func.isRequired,
    fetchChannels: PropTypes.func,
    fetchOperations: PropTypes.func,
    fetchTargets: PropTypes.func
  }).isRequired
}

const contextTypes = {}

class SMSTemplatesGrid extends Component {
  constructor (props) {
    super(props)
    props.actions.fetchTemplates()
    props.actions.fetchChannels()
    props.actions.fetchOperations()
    props.actions.fetchTargets()
  }

  componentWillReceiveProps (newProps) {
    if (this.props.changeId !== newProps.changeId) {
      this.props.actions.fetchTemplates()
    }
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

SMSTemplatesGrid.propTypes = propTypes

SMSTemplatesGrid.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => ({
  fields: state.smsTemplatesGrid.get('fields').toJS(),
  data: state.smsTemplatesGrid.get('data').toJS(),
  rowsChecked: state.smsTemplatesGrid.get('rowsChecked').toJS(),
  changeId: state.smsTemplatesDialog.get('changeId')
})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SMSTemplatesGrid)
