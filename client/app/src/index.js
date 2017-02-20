import mqtt from 'mqtt'

// MQTT CLIENT
const client = mqtt.connect('mqtt://localhost:9001')
client.on('connect', onConnected)
client.on('message', onMessage)
client.on('error', onError)
client.on('reconnect', onReconnect)
client.on('offline', onOffline)

function onConnected () {
  console.log('connected')
  connected = true
  userId = client.options.clientId
  updateConnectionStatus()
  // ** update connected status in UI
}

function onMessage (topic, msg) {
  if (topic && msg && msg.length > 0) {
    addToChatWindow(msg.toString())
  }
  console.log(`Received on ${topic}: ${msg}`)
}

function onError (err) {
  console.log(`Error: ${err}`)
}

function onReconnect () {
  console.log('Connection lost...reconnecting.')
  connected = false
  updateConnectionStatus()
  // ** update connected status in UI
}

function onOffline () {
  console.log('Client has gone offline')
  // ** update connected status in UI
}

// SESSION VARS
const currTopic = 'welcome'
client.subscribe(currTopic)
let connected = false
let userId = 'anon_user'

// UI + JS
document.querySelector('#input-box input').focus()

function updateConnectionStatus () {
  let color = connected ? 'lime' : 'red'
  const statusIndicator = document.querySelector('#connection-status')
  statusIndicator.style.backgroundColor = color

  client.publish(currTopic, packageMessage(null, `${userId} is ${connected ? 'connected' : 'disconnected'}`))
}

const inputBox = document.querySelector('#input-box input')
inputBox.addEventListener('keypress', (event) => {
  if (event && event.key === 'Enter') {
    publishMessage(event.target.value.trim())
    event.target.value = ''
  }
})

function packageMessage (uid, msg) {
  return JSON.stringify({
    'uid': uid,
    'msg': msg
  })
}

function publishMessage (msg) {
  if (msg && msg.length > 0) {
    console.log(`publishing to ${currTopic}: ${msg}`)
    client.publish(currTopic, packageMessage(userId, msg), (err) => {
      if (err) {
        // ** TO-DO **
      }
    })
  }
}

function addToChatWindow (msg) {
  const data = JSON.parse(msg)
  console.log(data)
  const feedList = document.querySelector('#feed-list')
  const messageItem = document.createElement('li')
  messageItem.classList.add('message')
  const messageContent = document.createElement('ul')
  const messageText = document.createElement('li')

  if (data.uid !== null) {
    const messageId = document.createElement('li')
    messageId.classList.add('user-id')
    messageId.appendChild(document.createTextNode(data.uid))
    messageContent.appendChild(messageId)
  } else {
    messageText.style.fontStyle = 'italic'
  }

  messageText.classList.add('message-text')
  messageText.appendChild(document.createTextNode(data.msg))
  messageContent.appendChild(messageText)
  messageItem.appendChild(messageContent)
  feedList.appendChild(messageItem)
}

// send ID as part of message, split on reciept
//
// the 2 connection problem
//      Solution: run webpack with --watch + separate server
//       ! This works
//        !! POst question on Stack Overflow with code from 'master' to find out what is causing the multiple connections
//

// NOTES / ??
// What's the best way to listen for an 'Enter' keypress in a submit form? The event listener is checking for every keypress, which adds lots of unecessary events to the queue
