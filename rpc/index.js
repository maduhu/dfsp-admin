module.exports = {
  id: 'backend',
  createPort: require('ut-port-jsonrpc'),
  url: global.window && global.window.location.origin,
  namespace: ['identity']
}
