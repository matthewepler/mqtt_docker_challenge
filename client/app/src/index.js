/* global prompt */
import mqtt from 'mqtt'

let connected = false
let userId = 'anon_user'
let currTopic = 'welcome'

const client = mqtt.connect('mqtt://localhost:9001')
client.on('close', onClose)
client.on('connect', onConnected)
client.on('error', onError)
client.on('message', onMessage)
client.on('offline', onOffline)
client.on('reconnect', onReconnect)

document.querySelector('#input-box input').focus()
const inputBox = document.querySelector('#input-box input')
inputBox.addEventListener('keypress', (event) => {
  if (event && event.key === 'Enter') {
    publishMessage(event.target.value.trim())
    event.target.value = ''
  }
})

const addTopicButton = document.querySelector('#add-topic-button button')
addTopicButton.addEventListener('click', promptNewTopic)

function onConnected () {
  connected = true
  client.subscribe(currTopic)
  userId = client.options.clientId
  updateConnectionStatus()
  updateUserNameTag()
}

function onMessage (topic, msg) {
  if (topic && msg && msg.length > 0) {
    addToChatWindow(msg.toString())
  }
}

function onError (err) {
  console.log(`Error: ${err}`)
}

function onReconnect () {
  console.log('Connection lost...reconnecting.')
  connected = false
}

function onClose () {
  console.log('close event')
  connected = false
  updateConnectionStatus()
}

function onOffline () {
  console.log('Client has gone offline')
  connected = false
  updateConnectionStatus()
}

function updateConnectionStatus () {
  let color = connected ? 'lime' : 'red'
  const statusIndicator = document.querySelector('#connection-status')
  statusIndicator.style.backgroundColor = color
}

function updateUserNameTag () {
  const userIdTag = document.querySelector('#userId-tag')
  userIdTag.innerHTML = userId
}

function packageMessage (uid, msg) {
  return JSON.stringify({
    'uid': uid,
    'msg': msg
  })
}

function publishMessage (msg) {
  if (msg && msg.length > 0) {
    client.publish(currTopic, packageMessage(userId, msg), (err) => {
      if (err) {
        // ** TO-DO **
      }
    })
  }
}

function addToChatWindow (msg) {
  const data = JSON.parse(msg)
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

// function gracefullyDisconnect () {
//   connected = false;
//   updateConnectionStatus()
//   client.publish(null, `${userId} has disconnected`, () => {
//     client.end()
//   })
// }

function promptNewTopic () {
  currTopic = prompt('Enter a new topic name')
  console.log(currTopic)
}

// -- TO-DO --

// -- QUESTIONS --
// What's the best way to listen for an 'Enter' keypress in a submit form? The event listener is checking for every keypress, which adds lots of unecessary events to the queue
//
// how to register a disconnect across clients?
//   seems like it has to be an event from the broker since browsers block the
//   events provided...(?)
