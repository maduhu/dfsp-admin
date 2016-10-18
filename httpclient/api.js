module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['rule'],
  method: 'post'
}
