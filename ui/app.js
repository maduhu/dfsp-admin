import React from 'react'
import ReactDOM from 'react-dom'
import {
  UtFront
} from 'ut-front/react'
import initApp from 'ut-front-react/initApp'
import MaterialUILayout from 'ut-front-react/components/MaterialUILayout'
import { LOGOUT } from 'ut-front-react/containers/LoginForm/actionTypes'
import UtRuleReducers from 'ut-rule/ui/react/reducers'
import UtBulkReducers from './ut-bulk/ui/react/reducers'
import UtNotificationsReducers from './ut-notifications/ui/react/reducers'
import logo from './administration/assets/images/logo.png'
import {
  UtRuleRoutes
} from 'ut-rule/ui/react'
import UTFrontReactReducers from 'ut-front-react/reducers'
import tabRecuders from 'ut-front-react/containers/TabMenu/reducers'
import {
  Route
} from 'react-router'
import Provider from './provider'
import ConfigProvider from './configProvider'
import { getRoute } from 'ut-front/react/routerHelper'
import Dashboard from './Pages/DashboardWrapper'
import {AppContainer} from 'react-hot-loader'
import {UtBulkRoutes} from './ut-bulk/ui/react'
import {UtNotificationsRoutes} from './ut-notifications/ui/react'

module.exports = {
  init: function (bus) {
    this.bus = bus
    document.getElementsByTagName('head')[0].innerHTML +=
      '<link type="text/css" rel="stylesheet" href="/s/admin/style.css">' +
      `<link href="${logo}" rel="icon" type="image/x-icon" />`
    document.title = 'DFSP Admin'
  },
  load: function () {
    const routes = (
      <Route component={ConfigProvider(this.bus.config['ut-rule'])}>
        <Route path={getRoute('dfsp-admin:dashboard')} component={Dashboard} />
        {UtRuleRoutes(this.bus.config['ut-rule'])}
        {UtBulkRoutes()}
        {UtNotificationsRoutes()}
      </Route>
    )
    var render = (app) => ReactDOM.render(
      <AppContainer>
        <Provider>
          <MaterialUILayout>
            <UtFront
              reducers={{
                ...UTFrontReactReducers,
                ...UtRuleReducers,
                ...tabRecuders,
                ...UtBulkReducers,
                ...UtNotificationsReducers
              }}
              utBus={this.bus}
              resetAction={LOGOUT}
              environment={!this.bus.config || !this.bus.config.debug ? 'production' : ''}>
                {app}
            </UtFront>
          </MaterialUILayout>
        </Provider>
      </AppContainer>,
      document.getElementById('utApp')
    )
    render(initApp({routes: routes}))
    if (module.hot) {
      module.hot.accept('ut-front-react/initApp', () => {
        render(require('ut-front-react/initApp').default({routes: routes}))
      })
    }
  }
}
