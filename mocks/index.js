module.exports = {
  id: 'script',
  createPort: require('ut-port-script'),
  namespace: ['core'],
  logLevel: 'trace',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  },
  'core.translation.fetch': function (msg, $meta) {
    return []
  },
  'core.itemTranslation.fetch': function (msg, $meta) {
    return []
  }
}
