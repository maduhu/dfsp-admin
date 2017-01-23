module.exports = {
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['identity'],
  method: 'post',
  'closeSession.request.send': function (msg, $meta) {
    return this.config.send(Object.assign(msg, $meta.auth), $meta)
  },
  'check.request.send': function (msg, $meta) {
    msg.uri = '/rpc'
    var request = this.config.send(msg, $meta)
    return request
  },
  'check.response.receive': function (msg, $meta) {
    if (msg && msg.payload && msg.payload.error && msg.payload.error.type) {
      throw Object.assign(new Error(), msg.payload.error)
    }
    return this.config.receive(msg, $meta)
  }
}
