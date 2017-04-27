module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['identity', 'rule', 'bulk', 'ledger'],
  method: 'post',
  send: function (msg, $meta) {
    if ($meta.auth && $meta.auth.actorId) {
      msg.actorId = $meta.auth.actorId
    }
    if ($meta.method === 'bulk.account.fetch') {
      $meta.method = 'ledger.account.fetch'
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
