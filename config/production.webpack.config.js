const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'build',
  "index.html"
]
// the clean options to use
let cleanOptions = {
  root:     '/home/amir/hapi-teachers/public',
  verbose:  true,
  dry:      false
};


module.exports = {
  entry: ['./client/main.js'],
  output: {
    path: path.resolve(__dirname, '../public/build'),
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
          'css': ExtractTextPlugin.extract(['css-loader']),
          'sass': ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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
    //new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.ProvidePlugin({
      Vue: 'vue$',
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../public/index.html'),
      template: path.resolve(__dirname, '../build/index_dev.html'),
      inject: true
    }),
    new ExtractTextPlugin('build/style.css')
  ],
  devtool: 'source-map'
}
