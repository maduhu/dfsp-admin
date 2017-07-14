import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Dropdown from 'ut-front-react/components/Input/Dropdown'

import * as actionCreators from './actions'

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  // mapStateToProps
  statuses: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })).isRequired,
  currentStatusId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  // mapDispatchToProps
  actions: PropTypes.shape({
    fetchStatuses: PropTypes.func,
    changeFilterStatus: PropTypes.func
  }).isRequired
}

const defaultProps = {
  className: '',
  currentStatusId: null,
  style: {}
}

export class ByStatus extends Component {
  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount () {
    this.props.actions.fetchStatuses()
  }

  handleSelect (record) {
    (record.value !== this.props.currentStatusId) &&
      this.props.actions.changeFilterStatus(record.value)
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
            data={this.props.statuses}
          />
      </div>
    )
  }
}

ByStatus.propTypes = propTypes
ByStatus.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {
    statuses: state.notificationsReportsFilterByStatus.get('statuses').toJS(),
    currentStatusId: state.notificationsReportsFilterByStatus.get('statusId')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ByStatus)
