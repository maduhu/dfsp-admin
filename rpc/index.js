module.exports = {
  id: 'backend',
  createPort: require('ut-port-jsonrpc'),
  url: global.window && global.window.location.origin,
  uri: '/rpc',
  namespace: ['identity', 'rule', 'core', 'bulk'],
  'identity.check.request.send': function (msg, $meta) {
    if (!msg.uri) {
      msg.uri = '/rpc/' + $meta.method
    }
    return this.config.send(msg, $meta)
  },
  'identity.check.response.receive': function (msg, $meta) {
    if (msg && msg.payload && msg.payload.error && msg.payload.error.type) {
      throw Object.assign(new Error(), msg.payload.error)
    }
    return this.config.receive(msg, $meta)
  }
}
