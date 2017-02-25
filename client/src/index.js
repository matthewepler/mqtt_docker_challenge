import mqtt from 'mqtt'

let connected = false
let userId = 'anon_user'
let currTopic = 'welcome'

const client = mqtt.connect('mqtt://localhost:9001')
client.on('connect', onConnected)
client.on('message', onMessage)
client.on('error', onError)
client.on('reconnect', onReconnect)
client.on('offline', onOffline)
client.on('close', onClose)

const inputBoxNode = qs('#input-box input')
const statusIndicatorNode = qs('#connection-status')
inputBoxNode.addEventListener('keypress', onKeypress)
qs('#add-topic-button button').addEventListener('click', promptNewTopic)

inputBoxNode.focus()

function onConnected () {
  connected = true
  client.subscribe(currTopic)
  userId = client.options.clientId
  updateConnectionStatus()
  updateUserNameTag()
}

function onMessage (topic, msg) {
  if (topic && msg && msg.length) {
    addToChatWindow(
      JSON.parse(
        msg.toString())
      )
    )    
  }
}

function onError (err) {
  console.error(err)
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
  statusIndicatorNode.classList.toggle('active')
}

function updateUserNameTag () {
  const userIdTag = qs('#userId-tag')
  userIdTag.innerHTML = userId
}

function publishMessage (msg) {
  if (msg && msg.length > 0) {
    client.publish(currTopic, JSON.stringify({ userId, msg }), (err) => {
      if (err) {
        // ** TO-DO **
      }
    })
  }
}

function onKeypress ({ key, target }) {
  if (key !== 'Enter') {
    return
  }

  publishMessage(target.value.trim())
  target.value = ''
}

function addToChatWindow ({ uid, msg }) {
  const feedList = qs('#feed-list')
  const messageItem = document.createElement('li')
  messageItem.classList.add('message')
  messageItem.textContent(msg)

  if (!uid) {
    messageItem.classList.add('orphan')
  }

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
  currTopic = global.prompt('Enter a new topic name')
  console.log(currTopic)
}

function qs (selector) {
  return document.querySelector(selector)
}

// -- TO-DO --

// -- QUESTIONS --
// What's the best way to listen for an 'Enter' keypress in a submit form? The event listener is checking for every keypress, which adds lots of unecessary events to the queue
//
// how to register a disconnect across clients?
//   seems like it has to be an event from the broker since browsers block the
//   events provided...(?)

