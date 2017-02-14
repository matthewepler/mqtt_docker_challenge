/* global it */

const expect = require('chai').expect
const mqtt = require('mqtt')

// a listener object which we can use to confirm messages are received as sent
const listener = mqtt.connect('mqtt://localhost:9001')
listener.subscribe('welcome')
listener.on('message', function (topic, message) {
  // should this be a spy, mock or stub?
})

it('should send a string to the broker', () => {
  client.sendMessage('hello', function (err) {
    // expect err to be null
    // expect that the listener got the message and it matches what we sent
  })
})

