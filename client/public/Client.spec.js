/* global after, before, beforeEach, describe, it */

import mqtt from 'mqtt'
import Client from './Client'
import chai, { expect } from 'chai'
import { spy, stub } from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('[Client]', () => {
  let cut

  before('setup spies', () => {
    stub(mqtt, 'connect')
    spy(console, 'log')
  })

  beforeEach('mock cut, reset spies', () => {
    cut = new Client()
    mqtt.connect.reset()
    console.log.reset()
  })

  after('setup spies', () => {
    mqtt.connect.restore()
    console.log.restore()
  })

  describe('[Client/init]', () => {
    it('should call mqtt.connect and client.on', () => {
      // given
      mqtt.connect.returns({ on: spy() })

      // when
      cut.init()

      // then
      expect(mqtt.connect).to.have.been.calledWith('mqtt://localhost:9001')
      expect(mqtt.connect).to.have.been.calledOnce
      expect(cut.client.on).to.have.been.calledWith('connect', cut.onConnect)
      expect(cut.client.on).to.have.been.calledWith('message', cut.onMessage)
      expect(cut.client.on).to.have.been.calledTwice
    })
  })

  describe('[Client/onConnect]', () => {
    it('should call subscribe, publish, and log', () => {
      // given
      cut.client = { subscribe: spy(), publish: spy() }

      // when
      cut.onConnect()

      // then
      expect(console.log).to.have.been.calledWith(process.env.NAME + ' has connected')
      expect(cut.client.subscribe).to.have.been.calledWith('welcome')
      expect(cut.client.publish).to.have.been.calledWith('welcome', 'heeey')
    })
  })

  describe('[Client/onMessage]', () => {
    it('should log the msg', () => {
      // given
      const topic = null
      const msg = 'some message' // or whatever format you expect your incoming messages to be

      // when
      cut.onMessage(topic, msg)

      // then
      expect(console.log).to.have.been.calledOnce
    })
  })
})
