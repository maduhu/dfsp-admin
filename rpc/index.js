module.exports = {
  id: 'backend',
  createPort: require('ut-port-jsonrpc'),
  url: global.window && global.window.location.origin,
  uri: '/rpc',
  headers: {
    Authorization: 'Basic ' + new Buffer('test' + ':' + '123').toString('base64')
  },
  namespace: ['identity', 'rule']
}
