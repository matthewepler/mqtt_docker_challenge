/* global prompt */
import mqtt from 'mqtt'

export default class Application {
  constructor (height, width) {
    this.connected = false
    this.userId = 'anon_user'
    this.currTopic = 'welcome'

    this.client = mqtt.connect('mqtt://localhost:9001')
  }

  init () {
    this.client.on('close', () => { this.onClose() })
    this.client.on('connect', () => { this.onConnected() })
    this.client.on('error', () => { this.onError() })
    this.client.on('message', (...args) => { this.onMessage(...args) })
    this.client.on('offline', () => { this.onOffline() })
    this.client.on('reconnect', () => { this.onReconnect() })
    this.initUIElements()
  }

  initUIElements () {
    document.querySelector('#input-box input').focus()
    const inputBox = document.querySelector('#input-box input')
    inputBox.addEventListener('keypress', (event) => {
      if (event && event.key === 'Enter') {
        this.publishMessage(event.target.value.trim())
        event.target.value = ''
      }
    })
    const addTopicButton = document.querySelector('#add-topic-button button')
    addTopicButton.addEventListener('click', this.promptNewTopic)
  }

  onConnected () {
    this.connected = true
    this.client.subscribe(this.currTopic)
    this.userId = this.client.options.clientId
    this.updateConnectionStatus()
    this.updateUserNameTag()
  }

  onMessage (topic, msg) {
    if (topic && msg && msg.length > 0) {
      this.addToChatWindow(msg.toString())
    }
  }
  onError (err) {
    console.log(`Error: ${err}`)
  }
  onReconnect () {
    console.log('Connection lost...reconnecting.')
    this.connected = false
  }
  onClose () {
    console.log('close event')
    this.connected = false
    this.updateConnectionStatus()
  }
  onOffline () {
    console.log('Client has gone offline')
    this.connected = false
    this.updateConnectionStatus()
  }
  updateConnectionStatus () {
    let color = this.connected ? 'lime' : 'red'
    const statusIndicator = document.querySelector('#connection-status')
    statusIndicator.style.backgroundColor = color
  }
  updateUserNameTag () {
    const userIdTag = document.querySelector('#userId-tag')
    userIdTag.innerHTML = this.userId
  }
  packageMessage (uid, msg) {
    return JSON.stringify({
      'uid': uid,
      'msg': msg
    })
  }
  publishMessage (msg) {
    if (msg && msg.length > 0) {
      this.client.publish(this.currTopic, this.packageMessage(this.userId, msg), (err) => {
        if (err) {
          // ** TO-DO **
          console.log('error', err)
        }
      })
    }
  }
  addToChatWindow (msg) {
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
  promptNewTopic () {
    this.currTopic = prompt('Enter a new topic name')
    console.log(this.currTopic)
  }
}

// -- TO-DO --

// -- QUESTIONS --
// What's the best way to listen for an 'Enter' keypress in a submit form? The event listener is checking for every keypress, which adds lots of unecessary events to the queue
//
// how to register a disconnect across this.clients?
//   seems like it has to be an event from the broker since browsers block the
//   events provided...(?)
