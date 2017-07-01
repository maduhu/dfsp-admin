import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { SimpleGrid } from 'ut-front-react/components/SimpleGrid'
import Text from 'ut-front-react/components/Text'

import {
  toggleRowCheckboxCheck,
  changeFieldVisibility,
  toggleHeaderCheckAll,
  fetchTemplates,
  toggleRowCheck
} from './actions'

const propTypes = {
  // mapStateToProps
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
  changeFieldVisibility: PropTypes.func.isRequired,
  fetchTemplates: PropTypes.func.isRequired,
  toggleRowCheck: PropTypes.func.isRequired,
  toggleHeaderCheckAll: PropTypes.func.isRequired,
  toggleRowCheckboxCheck: PropTypes.func.isRequired
}

const contextTypes = {}

class SMSTemplatesGrid extends Component {
  constructor (props) {
    super(props)
    props.fetchTemplates()
  }

  render () {
    const {
      fields,
      data,
      rowsChecked,
      toggleRowCheck,
      toggleHeaderCheckAll,
      changeFieldVisibility,
      toggleRowCheckboxCheck
    } = this.props
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
  rowsChecked: state.smsTemplatesGrid.get('rowsChecked').toJS()
})

const mapDispatchToProps = {
  changeFieldVisibility,
  fetchTemplates,
  toggleRowCheck,
  toggleHeaderCheckAll,
  toggleRowCheckboxCheck
}

export default connect(mapStateToProps, mapDispatchToProps)(SMSTemplatesGrid)
