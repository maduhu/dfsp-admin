/* eslint no-console:0 */
var path = require('path')
var webpack = require('webpack')
const httpserver = require('./httpserver/index.js')

var wb = require('ut-front/webpack/ut-front.config')({
  entryPoint: [require.resolve(httpserver.entryPoint)],
  outputPath: path.resolve(__dirname, 'dist'),
  cssImport: {
    path: path.resolve(__dirname, 'config')
  },
  cssAssets: {loadPaths: [
    path.resolve(__dirname, 'ui', 'administration', 'assets', 'images'),
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'components', '**', 'images')),
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'pages', '**', 'images')),
    path.resolve(path.join(path.dirname(require.resolve('ut-front-react')), 'containers', '**', 'images')),
    path.resolve(__dirname, 'ui', 'ut-bulk', 'ui', 'react', 'browser'),
    path.resolve(__dirname, 'ui', 'browser', 'images')
  ]}
}, false)
webpack(wb, (err, stats) => {
  if (err) {
    throw err
  } else {
    console.dir((stats.endTime - stats.startTime) / 1000, 's')
  }
})
