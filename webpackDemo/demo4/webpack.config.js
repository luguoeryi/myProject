var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB',
        vendor: ['lodash']
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 把公共业务代码单独打包
            name: 'common',
            minChunks: 2, // 至少引用两次
            chunks: ['pageA', 'pageB'] // 需要指定范围提取
        }),
        new webpack.optimize.CommonsChunkPlugin({ 
            name: ['vendor', 'manifest'], // 把第三方依赖的插件单独打包  把webpackJsonp的公共代码单独打包
            minChunks: Infinity // 不需要重复
        })
    ]
}