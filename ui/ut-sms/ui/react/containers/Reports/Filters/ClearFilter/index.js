import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actionCreators from './actions'

import classnames from 'classnames'
import style from './style.css'

const propTypes = {
  actions: PropTypes.shape({
    clearFilters: PropTypes.func
  }).isRequired
}

export class Clear extends Component {
  render () {
    return (
      <div
        onClick={this.props.actions.clearFilters}
        className={
          classnames(
            style.toolbarElement,
            style.noRightMargin,
            style.closeArrow
          )
        }
      />
    )
  }
}

Clear.propTypes = propTypes

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Clear)
