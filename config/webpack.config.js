const path = require('path')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../')

const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = [
  'build'
]

// the clean options to use
let cleanOptions = {
  root:     '/home/amir/public',
  verbose:  true,
  dry:      false
};

module.exports = {
    entry: ['webpack-hot-middleware/client', './client/main.js'],
    output: {
        path: path.resolve(__dirname, '../public/'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.vue'],
        alias: {
            'client': path.resolve(__dirname, '../client'),
            'components': path.resolve(__dirname, '../client/components'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'css': 'vue-style-loader!css-loader'
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'vue-html-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../build/index_dev.html'),
            filename: path.resolve(__dirname, '../public/index.html'),
            inject: true
        })
    ],
    devtool: 'eval'
}
