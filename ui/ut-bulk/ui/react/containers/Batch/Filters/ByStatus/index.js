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
    this.fetchData()
  }

  fetchData () {
    this.props.actions.fetchBatchStatus()
  }

  handleSelect (record) {
    (record.value !== this.props.currentStatus) ? this.props.actions.changeFilterStatus(record.value) : this.props.actions.changeFilterStatus(null)
  }

  render () {
    return (
       <div style={this.props.style} className={this.props.className}>
          <Dropdown
            canSelectPlaceholder
            placeholder='Select Status'
            defaultSelected={this.props.status}
            keyProp='status'
            onSelect={this.handleSelect}
            data={this.props.data}
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
  currentStatus: PropTypes.object,
  actions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      data: state.bulkBatchFilterStatus.get('batchStatus').toArray(),
      currentStatus: state.bulkBatchFilterStatus.get('isActive')
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actionCreators, dispatch)
    }
  }
)(ByStatus)
