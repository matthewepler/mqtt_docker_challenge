/* global it */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

it('should connect to the broker', function () {
  const mqtt = require('mqtt')
  const client = mqtt.connect('mqtt://broker.hivemq.com:1883')
  const connectionCallback = sinon.spy()
  client.on('connect', connectionCallback)
  expect(connectionCallback).to.have.been.called
})
