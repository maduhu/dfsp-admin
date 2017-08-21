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

export const UtNotificationsRoutes = (config) => {
  return (
    <Route component={getLocalProvider(config)}>
        <Route path={getRoute('ut-notifications:templates')} component={TemplatesPage} />
        <Route path={getRoute('ut-notifications:reports')} component={ReportsPage} />
    </Route>
  )
}
