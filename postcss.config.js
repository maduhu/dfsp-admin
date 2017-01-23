module.exports = (ctx) => ({
  plugins: [
    require('postcss-import')({
      addDependencyTo: ctx.webpack,
      path: ctx.webpack.options.postcssImportConfigPaths
    }),
    require('postcss-cssnext')
  ]
})
