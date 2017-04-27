var joi = require('joi')
var path = require('path')
module.exports = {
  ports: [
    require('../httpserver'),
    require('../httpclient/api'),
    require('../mocks')
  ],
  modules: {
    utfront: require('ut-front')({
      main: '../browser',
      from: __dirname,
      configPath: path.resolve(__dirname, '../config')
    }),
    frontend: require('ut-front-react'),
    identity: require('../service/identity'),
    adminHTTP: require('../ui/http'),
    bulk: require('../service/bulk'),
    core: {}
  },
  validations: {
    identity: {
      check: {
        description: 'identity check',
        notes: ['identity check'],
        tags: ['identity'],
        params: joi.any(),
        auth: false,
        route: '/login',
        result: joi.any()
      },
      closeSession: {
        params: joi.any(),
        result: joi.any()
      }
    },
    core: {
      'translation.fetch': {
        params: joi.any(),
        result: joi.any()
      }
    },
    bulk: require('ut-transfer/modules/bulk/validations')
  }
}
