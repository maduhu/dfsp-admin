const webpack = require('webpack')
const path = require('path')
const debug = (process.argv.slice(3)).some(argv => argv === '--debug')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    // Change this if you want to debug
    singleRun: !debug,
    autoWatch: false,
    // Tap framework for console output. This is not Tape.
    frameworks: ['tap'],
    // In this file all other files are required
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      './ui/ut-bulk/ui/react/components/**/*.js': 'coverage',
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    // You can choose which tap reporter suits
    tapReporter: {
      prettifier: 'tap-spec',
      separator: true
    },
    // Remove anoying LOG if not in debug mode
    client: {
      captureConsole: debug
    },
    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true },
        embedSource: true
      },
      type: 'html',
      dir: 'coverage'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader?modules=true', 'postcss-loader']
        }],
        preLoaders: [
          { test: /\.js|jsx$/, include: path.resolve('./ui/ut-bulk/ui/react/components'), loaders: ['isparta-loader'] }
        ]
      },
        // hot fix about Cannot resolve module 'fs' error
      node: {
        fs: 'empty'
      },
      resolve: {
        extensions: ['', '.js', '.json']
      },
      // Specify dependencies that shouldn’t be resolved by webpack,
      // but should become dependencies of the resulting bundle.
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
      },
        // Fixes the 'two copy of React' problem
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
        // Custom constants in code
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test'),
            API_URL: JSON.stringify('http://localhost:3000'),
            HOST_URL: JSON.stringify('/')
          }
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  })
}
