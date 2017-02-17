import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

export class ViewBatchRecords extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.context.router.push('/bulk/batch/' + this.props.batchId)
  }

  render () {
    return (
      <button
        onClick={this.handleClick}
        disabled={!this.props.batchId}
        style={this.props.style}
        className={this.props.className}
        >
          View Batch Records
      </button>
    )
  }
}

ViewBatchRecords.propTypes = {
  batchId: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
}

ViewBatchRecords.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
    }
  }, { }
)(ViewBatchRecords)