import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:9001')
client.on('connect', onConnected)
client.on('message', onMessage)

function onConnected () {
  console.log('hey there')
}

function onMessage (topic, msg) {
  console.log(`msg received on ${topic}: ${msg}`)
}

client.subscribe('welcome')
client.publish('welcome', 'hello test')
