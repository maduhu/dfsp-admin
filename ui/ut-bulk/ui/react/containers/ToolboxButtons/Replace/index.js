import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchBatches} from '../../Batch/Grid/actions'

import UploadForm from '../../UploadForm'

export class Replace extends Component {

  constructor (props) {
    super(props)
    this.togglePopup = this.togglePopup.bind(this)
    this.state = {
      uploadPopup: false
    }
  }

  togglePopup (refresh) {
    this.setState({
      uploadPopup: !this.state.uploadPopup
    })
    if (refresh === true) {
      this.props.fetchBatches()
    }
  }

  render () {
    return (
      <span>
        <button
          onClick={this.togglePopup}
          disabled={Object.keys(this.props.batch).length === 0}
          style={this.props.style}
          className={this.props.className}
          >
            Replace
        </button>
        {this.state.uploadPopup &&
          <UploadForm
            onClose={this.togglePopup}
            batch={this.props.batch}
          />
        }
        </span>
    )
  }
}

Replace.propTypes = {
  fetchBatches: PropTypes.func,
  batch: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string
}

Replace.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
    }
  },
  {
    fetchBatches
  }
)(Replace)
