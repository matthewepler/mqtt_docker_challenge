const resolve = require('path').resolve

module.exports = {
  entry: './test/index.test.js',
  output: {
    path: resolve(__dirname, 'test/'),
    filename: 'bundle.js'
  }
}
