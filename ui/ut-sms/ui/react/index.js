import React, {PropTypes} from 'react'
import { Route } from 'react-router'

import TemplatesPage from './pages/Templates'
import ReportsPage from './pages/Reports'

import {getRoute} from 'ut-front/react/routerHelper'
import registerRoutes from './registerRoutes'
export const mainRoute = registerRoutes()

const getLocalProvider = (config) => {
  return React.createClass({
    propTypes: {
      children: PropTypes.object
    },
    childContextTypes: {
      config: PropTypes.object
    },
    getChildContext () {
      return {
        config: config
      }
    },
    render () {
      return this.props.children
    }
  })
}

export const UtSMSRoutes = (config) => {
  return (
    <Route component={getLocalProvider(config)}>
        <Route path={getRoute('ut-sms:templates')} component={TemplatesPage} />
        <Route path={getRoute('ut-sms:reports')} component={ReportsPage} />
    </Route>
  )
}
