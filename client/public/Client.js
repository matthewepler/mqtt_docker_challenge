import mqtt from 'mqtt'

export default class Client {

  init () {
    this.client = mqtt.connect('mqtt://localhost:9001')
    this.client.on('connect', this.onConnect)
    this.client.on('message', this.onMessage)
  }

  onConnect () {
    console.log(process.env.NAME + ' has connected')
    this.subscribe('welcome')
    this.publish('welcome', 'heeey')
  }

  onMessage (topic, msg) {
    console.log('received: ' + msg.toString())
  }
}

const client1 = new Client()
client1.init()

//  line 15 used to read: this.client.subscribe('welcome')
//  error thrown  "Cannot read property 'subscribe' on undefined
//
// SOLUTION:
//  scope of 'this' within onConnect bound to parent scope - confusing!
//   is this using ES6 correctly? I thought it was supposed to solve scope
//   issues related to 'this' using fat arrows. Does this syntax negate that
//   functionality, and is there a way to bring it back using a different
//   syntax?
