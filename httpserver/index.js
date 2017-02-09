var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['utfront', 'frontend', 'ruleHTTP', 'bulk.start'],
  api: ['identity'],
  port: 8020,
  dist: path.resolve(__dirname, '../dist'),
  entryPoint: path.join(__dirname, '..', 'browser', 'index.js'),
  validationPassThrough: true,
  cssImport: {
    path: [path.resolve(__dirname, '../config')]
  },
  cssAssets: {loadPaths: [
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'components', '**', 'images')),
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'pages', '**', 'images')),
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'containers', '**', 'images'))
  ]},
  cookie: {
    ttl: 31536000000,
    encoding: 'none',
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
  },
  fileUpload: {
    maxFileName: 100,
    payloadMaxBytes: 5242880, // 5 MB. Default is 1048576 (1MB)
    extensionsWhiteList: ['csv']
  },
  _routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        tags: ['rpc'],
        auth: false
      }
    }
  }
}
