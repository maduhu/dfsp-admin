import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SearchBox from 'ut-front-react/components/SearchBox'

import * as actionCreators from './actions'

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  // mapStateToProps
  destination: PropTypes.string.isRequired,
  // mapDispatchToProps
  actions: PropTypes.shape({
    changeFilterDestination: PropTypes.func
  }).isRequired
}

const defaultProps = {
  destination: '',
  className: '',
  style: {}
}

export class ByDestination extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    (value !== this.props.destination) && this.props.actions.changeFilterDestination(value)
  }

  render () {
    return (
       <div style={this.props.style} className={this.props.className}>
          <SearchBox
            defaultValue={this.props.destination}
            placeholder='By Destination'
            keyProp='destination'
            onSearch={this.handleChange}
          />
      </div>
    )
  }
}

ByDestination.propTypes = propTypes
ByDestination.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {
    destination: state.notificationsReportsFilterByDestination.get('destination')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ByDestination)
