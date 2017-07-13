module.exports = {
  id: 'ui',
  createPort: require('ut-port-script'),
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
  namespace: ['ui'],
  imports: ['ui'],
  start: function () {
    this.bus.importMethod('ui.load')()
  }
}
