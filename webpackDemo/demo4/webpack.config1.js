var webpack = require('webpack')
var path = require('path')

// 提取公共业务代码

module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 多入口才生效
            name: 'common',
            minChunks: 2 // 至少引用两次
        })
    ]
}