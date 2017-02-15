/* global describe, it */

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
const mqtt = require('mqtt')
chai.use(sinonChai)

describe('mqtt chat test', () => {
  // using known reliable broker
  const client = mqtt.connect('mqtt://broker.hivemq.com:1883')
  const connectionCallback = sinon.spy()

  it('should connect to the broker', () => {
    client.on('connect', () => {
      connectionCallback()
      expect(connectionCallback).to.have.been.called
    })
    client.publish('fortunematthewtest', 'one_more_time')
  })
})

// PREVIOUS VERSION
//
// client.on('connect', connectionCallback)
//
// it('should connect', () => {
//    expect(connectionCallback).to.have.been.called
// })
