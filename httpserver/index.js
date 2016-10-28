var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['utfront', 'frontend', 'staticResources', 'ruleHTTP'],
  api: ['identity'],
  port: 8020,
  dist: path.resolve(__dirname, '../dist'),
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        auth: false
      }
    }
  },
  start: function (bus) {
    if (this.config.packer && this.config.packer.entry && this.config.packer.entry.bundle) {
      // set absolute path for entry bundle so that front-end could work the process has been started from another implementation.
      this.config.packer.entry.bundle[0] = path.join(path.resolve(__dirname, '..'), this.config.packer.entry.bundle[0])
    }
  }
}
