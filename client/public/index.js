import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:9001')
client.on('connect', () => {
  console.log('connected')
})
