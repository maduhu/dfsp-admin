import React from 'react'
import {
  Route
} from 'react-router'
import ReactDOM from 'react-dom'
import {
  UtFront
} from 'ut-front/react'
import initApp from 'ut-front-react/initApp'
import Layout from 'ut-front-react/pages/Layout'
import MaterialUILayout from 'ut-front-react/components/MaterialUILayout'
import {
  actionList
} from 'ut-front-react/pages/Login/actions'
import implReducers from './reducers'
import UTFrontReactReducers from 'ut-front-react/reducers'
import {
  Master
} from './pages'

module.exports = {
  init: function (bus) {
    this.bus = bus
    var headHTML = document.getElementsByTagName('head')[0].innerHTML +
      '<link type="text/css" rel="stylesheet" href="/s/dfsp_admin/style.css">'
    document.getElementsByTagName('head')[0].innerHTML = headHTML
    document.title = 'DFSP Admin'
  },
  load: function () {
    var routes = (
      <Route component={Master}>
        <Route component={Layout} />
      </Route>
    )
    ReactDOM.render(
      <MaterialUILayout>
        <UtFront
          reducers={{...UTFrontReactReducers, ...implReducers}}
          utBus={this.bus}
          resetAction={actionList.LOGOUT}
          environment={!this.bus.config || !this.bus.config.debug ? 'production' : ''}>
          {initApp(
            {
              routes: routes
            }
          )}
        </UtFront>
      </MaterialUILayout>,
      document.getElementById('utApp')
    )
  }
}
