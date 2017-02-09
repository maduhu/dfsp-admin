import React from 'react'
import {Dashboard} from '../Dashboard'

export default React.createClass({
  render () {
    return (
      <Dashboard {...this.props} tabName='Dashboard' pageText='Administration dashboard' />
    )
  }
})
