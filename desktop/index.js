module.exports = {
  ports: [
    require('../rpc'),
    require('../ui')
  ],
  modules: {
    ui: require('../ui/app')
  }
}
