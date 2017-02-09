import {registerRoute} from 'ut-front/react/routerHelper'

export default () => {
  let mainRoute = 'ut-bulk:home'
  registerRoute(mainRoute).path('/bulk-payments')
  return mainRoute
}
