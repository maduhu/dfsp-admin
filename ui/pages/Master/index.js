import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import preloader from '../../components/Preloader'
import errorWindow from '../../components/ErrorWindow'
import {
  close
} from './actions'

const Preloader = connect(
  (state) => {
    return state.preloadWindow
  }
)(preloader)

const ErrorWindow = connect(
  (state) => {
    return state.errorWindow
  }, {
    close
  }
)(errorWindow)

const Main = React.createClass({
  propTypes: {
    login: PropTypes.object,
    children: PropTypes.object
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className='wrapper'>
        {this.props.children}
        <Preloader />
        <ErrorWindow />
      </div>
    )
  }
})

export default connect(
  (state, ownProps) => ({
    login: state.login
  })
)(Main)
