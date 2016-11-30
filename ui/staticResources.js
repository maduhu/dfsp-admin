var path = require('path')
var pckgJson = require('../package.json')

module.exports = {
  start: function () {
    this && this.registerRequestHandler && this.registerRequestHandler([{
      method: 'GET',
      path: '/s/dfsp_admin/{file*}',
      config: {
        auth: false
      },
      handler: {
        directory: {
          path: path.join(__dirname, 'browser'),
          listing: false,
          index: false,
          lookupCompressed: true
        }
      }
    },
    {
      method: 'GET',
      path: '/version',
      config: {
        auth: false
      },
      handler: function (request, reply) {
        reply(pckgJson.version)
      }
    }])
  }
}
