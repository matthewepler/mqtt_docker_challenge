module.exports = function() {
  console.log("setting up html");
  $('#test-element').html(`<div id="main-container">
    <div id="nav-container">
      <div class="sec-header">
        <h3>MQTT chat</h3>
      </div>
      <div id="topic-list">
        <div id="add-topic-button">
          <button>+</button>
        </div>
        <ul>
          <li>welcome</li>
        </ul>
      </div>
    </div>
    <div id="chat-container">
      <div class="sec-header">
        <h3 id="current-topic">welcome</h3>
        <div id="userId-tag"></div>
        <div id="connection-status"></div>
      </div>
      <div id="feed">
        <ul id="feed-list"></ul>
      </div>
      <div id="input-box">
        <input type="text">
        <div class="label">
          [Enter] to send
        </div>
      </div>
    </div>
  </div>`)
}
