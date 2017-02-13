import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SearchBox from 'ut-front-react/components/SearchBox'
import * as batchAction from '../../Grid/actions'

export class ByName extends Component {

  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {
    if (text !== '') {
      this.props.batchActions.fetchBatches({name: text})
    } else {
      this.props.batchActions.fetchBatches()
    }
  }

  render () {
    return (
      <div style={this.props.style} className={this.props.className}>
        <SearchBox
          defaultValue={this.props.text}
          placeholder='By Name'
          onSearch={this.handleSearch}
        />
      </div>
    )
  }
}

ByName.propTypes = {
  changeNameFilter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  batchActions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      text: ''
    }
  },
  (dispatch) => {
    return {
      batchActions: bindActionCreators(batchAction, dispatch)
    }
  }
)(ByName)
