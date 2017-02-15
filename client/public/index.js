const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:9001')

client.subscribe('welcome')

client.on('connect', function () {
  console.log(process.env.NAME + ' has connected')
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})

module.exports = {
  sendMessage: function (msg, callback) {
    client.publish('welcome', msg, callback)
  }
}

process.on('SIGINT', function () {
  client.end()
})

setTimeout(function () {
  client.publish('welcome', 'come on')
}, 5000)
