import mqtt from 'mqtt'

export default class Client {

  init () {
    this.client = mqtt.connect('mqtt://localhost:9001')
    this.client.on('connect', this.onConnect)
    this.client.on('message', this.onMessage)
  }

  onConnect = () => {
    console.log(process.env.NAME + ' has connected')
    this.client.subscribe('welcome')
    this.client.publish('welcome', 'heeey')
  }

  onMessage = (topic, msg) => {
    console.log('received: ' + msg.toString())
  }
}
