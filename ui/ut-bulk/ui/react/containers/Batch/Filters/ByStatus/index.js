import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Dropdown from 'ut-front-react/components/Input/Dropdown'

import * as actionCreators from './actions'

export class ByStatus extends Component {

  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount () {
    this.props.actions.fetchBatchStatuses()
  }

  handleSelect (record) {
    (record.value !== this.props.currentStatusId) && this.props.actions.changeFilterStatus(record.value)
  }

  capitalize (obj) {
    var letters = obj.name.split('')
    letters[0] = letters[0].toUpperCase()
    obj.name = letters.join('')
    return obj
  }

  render () {
    return (
       <div style={this.props.style} className={this.props.className}>
          <Dropdown
            canSelectPlaceholder
            placeholder='Select Status'
            defaultSelected={this.props.currentStatusId}
            keyProp='status'
            onSelect={this.handleSelect}
            data={this.props.data.map(this.capitalize)}
          />
      </div>
    )
  }
}

ByStatus.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.array,
  status: PropTypes.object,
  currentStatusId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  actions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      data: state.bulkBatchFilterStatus.get('batchStatuses').toArray(),
      currentStatusId: state.bulkBatchFilterStatus.get('statusId')
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actionCreators, dispatch)
    }
  }
)(ByStatus)
