/* global chai, describe, it */
const expect = chai.expect

console.log('testing from test.index.js')
const app = require('../app/src/index.js').app

console.log(app.onConnected)

describe('src/index.js', function () {
  it('should see the document object', function () {
    expect(document).to.be.okay
  })
})
