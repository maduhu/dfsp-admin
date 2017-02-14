import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import DatePicker from 'ut-front-react/components/DatePicker/Simple'
import * as batchAction from '../../Grid/actions'

export class ByDate extends Component {

  constructor (props) {
    super(props)
    this.handleFromDateChange = this.handleFromDateChange.bind(this)
    this.handleToDateChange = this.handleToDateChange.bind(this)
  }

  handleFromDateChange (date) {
    if (date.value !== '') {
      this.props.batchActions.fetchBatches({fromDate: date.value})
    } else {
      this.props.batchActions.fetchBatches()
    }
  }
  handleToDateChange (date) {
    if (date.value !== '') {
      this.props.batchActions.fetchBatches({toDate: date.value})
    } else {
      this.props.batchActions.fetchBatches()
    }
  }

  render () {
    let {startDate, endDate} = this.props
    return (
       <div style={this.props.style} className={this.props.className}>
         <div>
          <DatePicker
            defaultValue={startDate}
            onChange={this.handleFromDateChange}
          />
         </div>
          <div>
            <DatePicker
              defaultValue={endDate}
              onChange={this.handleToDateChange}
            />
          </div>
      </div>
    )
  }
}

ByDate.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  batchActions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      startDate: state.bulkBatchFilterDate.get('startDate'),
      endDate: state.bulkBatchFilterDate.get('endDate')
    }
  },
  (dispatch) => {
    return {
      batchActions: bindActionCreators(batchAction, dispatch)
    }
  }
)(ByDate)
