module.exports = {
  id: 'backend',
  createPort: require('ut-port-jsonrpc'),
  url: global.window && global.window.location.origin,
  uri: '/rpc',
  namespace: ['identity', 'rule', 'core', 'bulk', 'ledger', 'notification'],
  'identity.check.request.send': function (msg, $meta) {
    if (!msg.uri) {
      msg.uri = '/rpc/' + $meta.method
    }
    return this.config.send(msg, $meta)
  }
}
