import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SearchBox from 'ut-front-react/components/SearchBox'
import * as actions from './actions'

export class ByName extends Component {

  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (text) {
    (text === '') ? this.props.actions.changeNameFilter(null) : this.props.actions.changeNameFilter(text)
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
  actions: PropTypes.object
}

export default connect(
  (state, ownProps) => {
    return {
      text: ''
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch)
    }
  }
)(ByName)
