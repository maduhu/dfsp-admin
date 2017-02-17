import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './actions'

export class CheckBatch extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.batchId ? this.props.actions.checkBatch(this.props.batchId, this.props.actorId) : this.props.actions.checkPayments(this.props.paymentIds, this.props.actorId)
  }

  render () {
    return (
      <button
        onClick={this.handleClick}
        disabled={!this.props.batchId && !this.props.paymentIds || !this.props.actorId}
        style={this.props.style}
        className={this.props.className}
        >
          {this.props.buttonText || 'Check Batch'}
      </button>
    )
  }
}

CheckBatch.propTypes = {
  actions: PropTypes.object,
  batchId: PropTypes.number,
  paymentIds: PropTypes.arrayOf(PropTypes.string),
  actorId: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  buttonText: PropTypes.string
}

CheckBatch.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      actorId: state.login.getIn(['result', 'identity.check', 'actorId'])
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
  }
)(CheckBatch)
