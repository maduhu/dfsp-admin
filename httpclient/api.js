module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['identity', 'rule', 'bulk', 'ledger', 'notification'],
  method: 'post',
  send: function (msg, $meta) {
    if ($meta.auth && $meta.auth.actorId) {
      msg.actorId = $meta.auth.actorId
    }
    return {
      uri: '/rpc/' + $meta.method,
      payload: {
        id: 1,
        jsonrpc: '2.0',
        method: $meta.method,
        params: msg
      }
    }
  }
}
