module.exports = (ctx) =>({
    plugins: [
        require('postcss-import')({
            path: ctx.webpack.options.postcssImportConfigPaths
        }),
        require('postcss-cssnext')
    ]
})
