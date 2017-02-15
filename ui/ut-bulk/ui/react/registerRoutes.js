import {registerRoute} from 'ut-front/react/routerHelper'

export default () => {
  let mainRoute = 'ut-bulk:home'
  let recordsRoute = 'ut-bulk:record'
  registerRoute(mainRoute).path('bulk/batch')
  registerRoute(recordsRoute).path('bulk/batch/:batchId')
  return mainRoute
}
