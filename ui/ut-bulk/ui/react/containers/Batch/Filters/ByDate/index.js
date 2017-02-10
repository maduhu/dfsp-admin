import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'ut-front-react/components/DatePicker/Simple'

export class ByDate extends Component {

  constructor (props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (date) {}

  render () {
    let {startDate, endDate} = this.props
    return (
       <div style={this.props.style} className={this.props.className}>
         <div>
          <DatePicker
            defaultValue={startDate}
            onChange={this.handleDateChange}
          />
         </div>
          <div>
            <DatePicker
              defaultValue={endDate}
              onChange={this.handleDateChange}
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
  endDate: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      startDate: state.bulkBatchFilterDate.get('startDate'),
      endDate: state.bulkBatchFilterDate.get('endDate')
    }
  }, {

  }
)(ByDate)
