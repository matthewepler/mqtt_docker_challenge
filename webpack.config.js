const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: resolve(__dirname, 'app/src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'app/dist/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(['NAME'])
  ]
}
