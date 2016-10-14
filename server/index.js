module.exports = {
  ports: [
    require('../httpserver'),
    require('../httpclient')
  ],
  modules: {
    utfront: require('ut-front')({main: '../browser', from: __dirname}),
    frontend: require('ut-front-react'),
    staticResources: require('../ui/staticResources'),
    ruleHTTP: require('ut-rule/ui/react/http')
  }
}
