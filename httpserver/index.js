var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['utfront', 'frontend', 'staticResources', 'ruleHTTP'],
  api: ['identity'],
  port: 8020,
  dist: path.resolve(__dirname, '../dist'),
  entryPoint: path.join(__dirname, '..', 'browser', 'index.js'),
  validationPassThrough: true,
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        auth: false
      }
    }
  }
}
