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
  channels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  targets: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
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

class NotificationsTemplatesGrid extends Component {
  constructor (props) {
    super(props)
    this.handleTransformCellValue = this.handleTransformCellValue.bind(this)
  }

  handleTransformCellValue (value, field, data, isHeader) {
    if (isHeader) {
      return <Text>{value}</Text>
    } else if (field.name === 'channelId') {
      return (
        this.props.channels.filter(
          channel => channel.key === data.channelId
        )[0].name
      )
    } else if (field.name === 'operationId') {
      return (
        this.props.operations.filter(
          operation => operation.key === data.operationId
        )[0].name
      )
    } else if (field.name === 'targetId') {
      return (
        this.props.targets.filter(
          target => target.key === data.targetId
        )[0].name
      )
    }
    return value
  }

  componentWillReceiveProps (newProps) {
    if (this.props.changeId !== newProps.changeId) {
      this.props.actions.fetchTemplates()
    }
  }

  componentWillMount () {
    Promise.all([this.props.actions.fetchChannels(), this.props.actions.fetchOperations(), this.props.actions.fetchTargets()])
    .then(() => {
      this.props.actions.fetchTemplates()
    })
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
}

NotificationsTemplatesGrid.propTypes = propTypes

NotificationsTemplatesGrid.contextTypes = contextTypes

const mapStateToProps = (state, ownProps) => ({
  fields: state.notificationsTemplatesGrid.get('fields').toJS(),
  data: state.notificationsTemplatesGrid.get('data').toJS(),
  rowsChecked: state.notificationsTemplatesGrid.get('rowsChecked').toJS(),
  changeId: state.notificationsTemplatesDialog.get('changeId'),
  channels: state.notificationsTemplatesGrid.get('channels').toJS(),
  operations: state.notificationsTemplatesGrid.get('operations').toJS(),
  targets: state.notificationsTemplatesGrid.get('targets').toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTemplatesGrid)
