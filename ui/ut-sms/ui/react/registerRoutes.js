import {registerRoute} from 'ut-front/react/routerHelper'

export default () => {
  let templatesRoute = 'ut-sms:templates'
  let reportsRoute = 'ut-sms:reports'
  registerRoute(templatesRoute).path('sms/templates')
  registerRoute(reportsRoute).path('sms/records')
  return [
    templatesRoute, reportsRoute
  ]
}
