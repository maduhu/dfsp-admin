import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Dropdown from 'ut-front-react/components/Input/Dropdown'
import * as actionCreators from './actions'
import * as batchAction from '../../Grid/actions'

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
    if (record.value !== this.props.currentStatus) {
      this.props.batchActions.fetchBatches({batchStatusId: record.value})
    } else {
      this.props.batchActions.fetchBatches()
    }
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
  actions: PropTypes.object,
  batchActions: PropTypes.object
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
      actions: bindActionCreators(actionCreators, dispatch),
      batchActions: bindActionCreators(batchAction, dispatch)
    }
  }
)(ByStatus)
