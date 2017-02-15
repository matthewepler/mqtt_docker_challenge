/* global describe, it */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

describe('MQTT messaging', function () {
  const mqtt = require('mqtt')
  const client = mqtt.connect('mqtt://localhost:9001')

  client.subscribe('testTopic')
  const connectCallback = sinon.spy()
  const messageCallback = sinon.spy()
  client.on('connect', connectCallback)
  client.on('message', messageCallback)

  it('should send a string to the broker', function () {
    const message = 'testing testing 123'
    client.publish('testTopic', message)
    expect(messageCallback).to.have.been.called
    expect(messageCallback).to.have.been.calledWith('testTopic', message)
  })
})

