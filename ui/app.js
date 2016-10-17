import React from 'react'
import ReactDOM from 'react-dom'
import {
  UtFront
} from 'ut-front/react'
import implReducers from './reducers'
import UtRuleReducers from 'ut-rule/ui/react/reducers'
import UtRuleRoutes from 'ut-rule/ui/react/routes'
import { Route, Redirect } from 'react-router';

module.exports = {
  init: function (bus) {
    this.bus = bus
    document.getElementsByTagName('head')[0].innerHTML +=
      '<link type="text/css" rel="stylesheet" href="/s/dfsp_admin/style.css">' +
      '<link type="text/css" rel="stylesheet" href="/s/rule/style.css">'
    document.title = 'DFSP Admin'
  },
  load: function () {
    const routes = (
      <Route>
        <Redirect from='/' to='rule' />
        <Route path='rule'>
          {UtRuleRoutes}
        </Route>
      </Route>
    );
    ReactDOM.render(
      <UtFront
        reducers={{...implReducers, ...UtRuleReducers}}
        utBus={this.bus}
        environment={!this.bus.config || !this.bus.config.debug ? 'production' : ''}>
          {routes}
      </UtFront>,
      document.getElementById('utApp')
    )
  }
}
