/* global chai, describe, it */
const expect = chai.expect

import mqtt from 'mqtt'

const setupHTML = require('./helpers/setupApplicationHTML');

import Application from '../app/src/Application';

let app;

describe('src/index.js', function () {
  beforeEach(() => {
    setupHTML();
  })

  it('should not have any mqtt connections unless we create an Application', () => {
    expect(mqtt.connections).to.have.length(0);
    let app = new Application();
    expect(mqtt.connections).to.have.length(1);
    app = undefined;
    expect(mqtt.connections).to.have.length(0);
  })

  describe('application initialisation', function() {
    beforeEach(() => {
      setupHTML();
      let app = new Application();
      app.init();
    })

    it.only('should see the document object', function () {
      expect(document).to.be.okay
    })
  })
})
