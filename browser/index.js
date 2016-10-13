require('ut-run').run({
  main: require('../desktop'),
  config: require('./dev.json'),
  method: 'debug'
}, module)
