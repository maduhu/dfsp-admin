module.exports = {
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['identity'],
  method: 'post',
  'check.request.send': function (msg, $meta) {
    msg.uri = '/rpc'
    return this.config.send(msg, $meta)
  }
}
