module.exports = {
    entry: {
        app: './assets/js/app.js'
    },
    output: {
        filename: './build/js/[name].[hash:8].js'
    },
    module: {
        rules: [ // 规则
            {
                test: /\.js$/,
                use: { // 使用的loader  {string, object}
                    loader: 'babel-loader'
                    // options: {presets: []} // babel相关配置可以放在 .babelrc文件中
                },
                exclude: '/node_modules/' // 排除在规则之外
            }
        ]
    }
}