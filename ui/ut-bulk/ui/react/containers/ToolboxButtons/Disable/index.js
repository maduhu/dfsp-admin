import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './actions'

export class Disable extends Component {

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
          Disable
      </button>
    )
  }
}

Disable.propTypes = {
  actions: PropTypes.object,
  batchId: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
}

Disable.contextTypes = {
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
)(Disable)
