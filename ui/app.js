import React from 'react'
import ReactDOM from 'react-dom'

module.exports = {
  init: function (bus) {
    this.bus = bus
    document.getElementsByTagName('head')[0].innerHTML += '<link type="text/css" rel="stylesheet" href="/s/dfsp_admin/style.css">'
    document.title = 'DFSP Admin'
  },
  load: function () {
    ReactDOM.render(
      <div>DFSP Admin</div>,
      document.getElementById('utApp')
    )
  }
}
