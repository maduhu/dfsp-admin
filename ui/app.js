import React from 'react'
import ReactDOM from 'react-dom'
import {
  UtFront
} from 'ut-front/react'
import initApp from 'ut-front-react/initApp'
import MaterialUILayout from 'ut-front-react/components/MaterialUILayout'
import {
  actionList
} from 'ut-front-react/pages/Login/actions'
import UtRuleReducers from 'ut-rule/ui/react/reducers'
import {
  UtRuleRoutes
} from 'ut-rule/ui/react'
import UTFrontReactReducers from 'ut-front-react/reducers'
import tabRecuders from 'ut-front-react/containers/TabMenu/reducers'
import {
  Route
} from 'react-router'
import Provider from './provider'

module.exports = {
  init: function (bus) {
    this.bus = bus
    document.getElementsByTagName('head')[0].innerHTML +=
      '<link type="text/css" rel="stylesheet" href="/s/rule/style.css">' +
      '<link type="text/css" rel="stylesheet" href="/s/dfsp_admin/style.css">'
    document.title = 'DFSP Admin'
  },
  load: function () {
    const routes = (
      <Route>
          {UtRuleRoutes()}
        </Route>
    )
    ReactDOM.render(
      <Provider>
        <MaterialUILayout>
          <UtFront
            reducers={{...UTFrontReactReducers, ...UtRuleReducers, ...tabRecuders}}
            utBus={this.bus}
            resetAction={actionList.LOGOUT}
            environment={!this.bus.config || !this.bus.config.debug ? 'production' : ''}>
              {initApp({routes: routes})}
          </UtFront>
        </MaterialUILayout>
      </Provider>,
      document.getElementById('utApp')
    )
  }
}
