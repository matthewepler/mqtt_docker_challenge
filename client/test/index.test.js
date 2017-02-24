/* global chai, describe, it */
const expect = chai.expect

describe('src/index.js', function () {
  it('should see the document object', function () {
    expect(document).to.be.okay
  })
})
