var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['utfront', 'frontend', 'staticResources', 'ruleHTTP'],
  api: ['admin'],
  port: 8020,
  dist: path.resolve(__dirname, '../dist'),
  cookie: {
    ttl: 31536000000,
    encoding: 'none',
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true,
    path: '/'
  }
}
