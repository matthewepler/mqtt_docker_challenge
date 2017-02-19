const { resolve } = require('path')
const join = require('path').join
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, 'public/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /public/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: resolve(__dirname, '/public'),
    filename: 'bundle.js'
  },
  plugins: [
    // detects changes to html files
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(['NAME'])
  ],
}
