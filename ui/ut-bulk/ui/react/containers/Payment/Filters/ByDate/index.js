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
    return (
       <div style={this.props.style} className={this.props.className}>
         <div>
          <DatePicker
            defaultValue={this.props.selectedDate}
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
  selectedDate: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      selectedDate: state.bulkPaymentFilterDate.get('selectedDate')
    }
  }, {

  }
)(ByDate)
