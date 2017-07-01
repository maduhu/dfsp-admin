import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import DatePicker from 'ut-front-react/components/DatePicker/Simple'
import * as actions from './actions'

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  actions: PropTypes.shape({
    changeFilterDate: PropTypes.func
  }).isRequired
}

const defaultProps = {
  style: '',
  className: '',
  startDate: new Date(),
  endDate: new Date()
}

export class ByDate extends Component {
  handleDateChange (field) {
    return (date) => {
      this.props.actions.changeFilterDate(field, date.value)
    }
  }

  render () {
    let {startDate, endDate} = this.props
    return (
       <div style={this.props.style} className={this.props.className}>
         <div>
          <DatePicker
            defaultValue={startDate}
            onChange={this.handleDateChange('startDate')}
            hintText='From'
          />
         </div>
          <div>
            <DatePicker
              defaultValue={endDate}
              onChange={this.handleDateChange('endDate')}
              hintText='To'
            />
          </div>
      </div>
    )
  }
}

ByDate.propTypes = propTypes
ByDate.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => ({
  startDate: state.bulkBatchFilterDate.get('startDate') ? new Date(state.bulkBatchFilterDate.get('startDate')) : null,
  endDate: state.bulkBatchFilterDate.get('endDate') ? new Date(state.bulkBatchFilterDate.get('endDate')) : null
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ByDate)
