var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['utfront', 'frontend', 'ruleHTTP'],
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
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'containers', '**', 'images')),
    path.resolve(__dirname, '..', 'ui', 'administration', 'assets', 'images')
  ]},
  cookie: {
    ttl: 31536000000,
    encoding: 'none',
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
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
