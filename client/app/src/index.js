import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:9001')
client.on('connect', onConnected)
client.on('message', onMessage)
client.on('error', onError)
client.on('reconnect', onReconnect)
client.on('offline', onOffline)

function onConnected () {
  console.log('hey there')
  // ** update connected status in UI
}

function onMessage (topic, msg) {
  if (topic && msg && msg.length > 0) {
    addToChatWindow(msg)
  }
  console.log(`Received on ${topic}: ${msg}`)
}

function onError (err) {
  console.log(`Error: ${err}`)
}

function onReconnect () {
  console.log('Connection lost...reconnecting.')
  // ** update connected status in UI
}

function onOffline () {
  console.log('Client has gone offline')
  // ** update connected status in UI
}

client.subscribe('welcome')
client.publish('welcome', 'hello test')

// UI + JS
const inputBox = document.querySelector('#input-box input')
inputBox.addEventListener('keypress', (event) => {
  if (event && event.key === 'Enter') {
    publishMessage(event.target.value.trim())
    event.target.value = ''
  }
})

function publishMessage (msg) {
  if (msg && msg.length > 0) {
    console.log(`publishing to ${'welcome'}: ${msg}`)
    client.publish('welcome', msg, (err) => {
      if (err) {
        // ** TO-DO **
      }
    })
  }
}

function addToChatWindow (msg) {
  const feedList = document.querySelector('#feed-list')
  const messageItem = document.createElement('li')
  messageItem.appendChild(document.createTextNode(msg))
  feedList.appendChild(messageItem)
}

// add default topic as global
// clean up sign-on behavior
// test 2nd client
// style?

// the 2 connection problem
//      Solution: run webpack with --watch + separate server
//       ! This works
//        !! POst question on Stack Overflow with code from 'master' to find out what is causing the multiple connections
//
