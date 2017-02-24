/* global prompt */
import mqtt from 'mqtt'

let connected = false
let userId = 'anon_user'
let currTopic = 'welcome'

const client = mqtt.connect('mqtt://localhost:9001')

export const app = {
  init: function () {
    client.on('close', app.onClose)
    client.on('connect', app.onConnected)
    client.on('error', app.onError)
    client.on('message', app.onMessage)
    client.on('offline', app.onOffline)
    client.on('reconnect', app.onReconnect)
    app.initUIElements()
  },
  initUIElements: function () {
    document.querySelector('#input-box input').focus()
    const inputBox = document.querySelector('#input-box input')
    inputBox.addEventListener('keypress', (event) => {
      if (event && event.key === 'Enter') {
        app.publishMessage(event.target.value.trim())
        event.target.value = ''
      }
    })
    const addTopicButton = document.querySelector('#add-topic-button button')
    addTopicButton.addEventListener('click', app.promptNewTopic)
  },
  onConnected: function () {
    connected = true
    client.subscribe(currTopic)
    userId = client.options.clientId
    app.updateConnectionStatus()
    app.updateUserNameTag()
  },
  onMessage: function (topic, msg) {
    if (topic && msg && msg.length > 0) {
      app.addToChatWindow(msg.toString())
    }
  },
  onError: function (err) {
    console.log(`Error: ${err}`)
  },
  onReconnect: function () {
    console.log('Connection lost...reconnecting.')
    connected = false
  },
  onClose: function () {
    console.log('close event')
    connected = false
    app.updateConnectionStatus()
  },
  onOffline: function () {
    console.log('Client has gone offline')
    connected = false
    app.updateConnectionStatus()
  },
  updateConnectionStatus: function () {
    let color = connected ? 'lime' : 'red'
    const statusIndicator = document.querySelector('#connection-status')
    statusIndicator.style.backgroundColor = color
  },
  updateUserNameTag: function () {
    const userIdTag = document.querySelector('#userId-tag')
    userIdTag.innerHTML = userId
  },
  packageMessage: function (uid, msg) {
    return JSON.stringify({
      'uid': uid,
      'msg': msg
    })
  },
  publishMessage: function (msg) {
    if (msg && msg.length > 0) {
      client.publish(currTopic, app.packageMessage(userId, msg), (err) => {
        if (err) {
          // ** TO-DO **
        }
      })
    }
  },
  addToChatWindow: function (msg) {
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
  },
  promptNewTopic: function () {
    currTopic = prompt('Enter a new topic name')
    console.log(currTopic)
  }
}

// -- TO-DO --

// -- QUESTIONS --
// What's the best way to listen for an 'Enter' keypress in a submit form? The event listener is checking for every keypress, which adds lots of unecessary events to the queue
//
// how to register a disconnect across clients?
//   seems like it has to be an event from the broker since browsers block the
//   events provided...(?)
