const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:9001')

client.on('connect', function () {
  console.log(process.env.NAME + ' has connected')
  client.subscribe('welcome')
  client.publish('welcome', 'heeey')
})

client.on('message', function (topic, msg) {
  console.log('received: ' + msg.toString())
})

