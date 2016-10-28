module.exports = {
  id: 'backend',
  createPort: require('ut-port-jsonrpc'),
  url: global.window && global.window.location.origin,
  uri: '/rpc',
  namespace: ['identity', 'rule', 'core']
}
