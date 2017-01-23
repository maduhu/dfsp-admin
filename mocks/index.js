module.exports = {
  id: 'script',
  createPort: require('ut-port-script'),
  namespace: ['core'],
  logLevel: 'trace',
  'core.translation.fetch': function (msg, $meta) {
    return []
  },
  'core.itemTranslation.fetch': function (msg, $meta) {
    return []
  }
}
