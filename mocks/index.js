module.exports = {
  id: 'script',
  createPort: require('ut-port-script'),
  namespace: ['core'],
  logLevel: 'trace',
  'core.itemTranslattion.fetch': function (msg, $meta) {
    return []
  }
}
