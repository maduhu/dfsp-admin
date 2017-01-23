/* eslint no-console:0 */
var path = require('path')
var webpack = require('webpack')
const httpserver = require('./httpserver/index.js')

var wb = require('ut-front/webpack/ut-front.config')({
  entryPoint: [require.resolve(httpserver.entryPoint)],
  outputPath: path.resolve(__dirname, 'dist'),
  cssImport: {
    path: path.resolve(__dirname, 'config')
  }
}, false)
wb.assetsConfig = {
  quiet: true
}
webpack(wb, (err, stats) => {
  if (err) {
    throw err
  } else {
    console.dir((stats.endTime - stats.startTime) / 1000, 's')
  }
})
