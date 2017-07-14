import {registerRoute} from 'ut-front/react/routerHelper'

export default () => {
  let templatesRoute = 'ut-notifications:templates'
  let reportsRoute = 'ut-notifications:reports'
  registerRoute(templatesRoute).path('notifications/templates')
  registerRoute(reportsRoute).path('notifications/records')
  return [
    templatesRoute, reportsRoute
  ]
}
