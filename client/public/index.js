const client = new Paho.MQTT.Client('broker', 9001, '/', process.env.NAME)

const onConnect = function () {
	console.log('connected')
	let message = new Paho.MQTT.Message('Hello')
	message.destinationName = 'room1'
	client.send(message)
}

const onConnectionLost = function (responseObject) {
	if (responseObject.errorCode !== 0) {
	  console.log('onConnectionLost: ' + responseObject.errorMessage)	
	}
}

const onMessageArrived = function (message) {
	console.log('onMessageArrived: ' + message.payloadString)
}

client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived

client.connect({onSuccess:onConnect()})


// const mqtt = require('mqtt')
// const client = mqtt.connect('ws://broker:9001')
// 
// client.on('connect', function() {
// 	console.log(process.env.NAME + ' has connected')
// })
