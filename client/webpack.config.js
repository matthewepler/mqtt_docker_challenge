const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    resolve(__dirname, 'public/index.js')
  ],
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
  devServer: {
    contentBase: resolve(__dirname, 'public'),
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    publicPath: '/'
  }
}
