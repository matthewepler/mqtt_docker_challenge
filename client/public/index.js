const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:9001')
 
client.on('connect', function() {
	console.log(process.env.NAME + ' has connected')
})
