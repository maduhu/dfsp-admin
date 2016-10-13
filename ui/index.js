module.exports = {
  id: 'ui',
  createPort: require('ut-port-script'),
  logLevel: 'trace',
  namespace: ['ui'],
  imports: ['ui'],
  start: function () {
    this.bus.importMethod('ui.load')()
  }
}
