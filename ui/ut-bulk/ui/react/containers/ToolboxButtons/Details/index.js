import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './actions'

export class Details extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    // TODO
  }

  render () {
    return (
      <button
        onClick={this.handleClick}
        disabled={!this.props.batchId}
        style={this.props.style}
        className={this.props.className}
        >
          Details
      </button>
    )
  }
}

Details.propTypes = {
  actions: PropTypes.object,
  batchId: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
}

Details.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
  }
)(Details)