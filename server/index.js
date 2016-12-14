var joi = require('joi')
var path = require('path')
module.exports = {
  ports: [
    require('../httpserver'),
    require('../httpclient/api'),
    require('../httpclient/identity'),
    require('../mocks')
  ],
  modules: {
    utfront: require('ut-front')({
      main: '../browser',
      from: __dirname,
      configPath: path.resolve(__dirname, '../config')
    }),
    frontend: require('ut-front-react'),
    staticResources: require('../ui/staticResources'),
    identity: {},
    ruleHTTP: require('ut-rule/ui/react/http')
  },
  validations: {
    identity: {
      check: {
        description: 'identity check',
        notes: ['identity check'],
        tags: ['identity'],
        params: joi.object({
          username: joi.string(),
          timezone: joi.string(),
          password: joi.string()
        }),
        auth: false,
        route: '/login',
        result: joi.any()
      }
    }
  }
}
