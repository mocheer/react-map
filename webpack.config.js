var webpack = require('webpack');  
module.exports = {
    entry: {
        "react-map":'./src/ReactMap.jsx'
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
                 test: /\.jsx$/,
                 exclude: /(node_modules|bower_components)/,//npm,bower
                 loader: 'babel-loader',
                 query:{presets:['es2015','react']}//如果使用的是loaders，就不能用 query，应该把presets参数写在 babel 的后面
            },   
        ],
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})//相当于webpack -p
    ]
}

