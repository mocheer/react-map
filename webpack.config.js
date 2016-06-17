var webpack = require('webpack');  

var config = {
    entry: {
        "react-map":'./src/ReactMap.js'
    },
    output: {
        path: __dirname,
        filename: 'examples/js/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                 test: /\.js(x)?$/,
                 exclude: /(node_modules|bower_components)/,//npm,bower
                 loader: 'babel-loader'
                //  query:{presets:['es2015','react']}//如果使用的是loaders，就不能用 query，应该把presets参数写在 babel 的后面
            }
        ],
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery"
        // }),  
        new webpack.optimize.OccurenceOrderPlugin(),//维持构建编译代码
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false},minimize:true}),//相当于webpack -p 压缩代码 
        new webpack.HotModuleReplacementPlugin(),//热替换,不用刷新页面，可用于生产环境
        new webpack.NoErrorsPlugin()//保证编译后的代码永远是对的
    ]
}

module.exports = config;


