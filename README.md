# MQTT Chat App
This was given to me as an internal project to build up my full-stack skills.
The goal is to learn how to make a small app using back-end tools (docker) and
a technology we use commonly at our company (mqtt). 

## Starting the App
* run `docker-compose up` at the project root to start the broker
* Navigate to the distribution directory:

  `cd client/app/dist`
* run a simple server. For example:

  `http-server` or `python -m SimpleHTTPServer 8080`
* navigate your browser to `localhost:8080`
* open another browser window next to the first one
* enter text into the input bar at the bottom of the screen and press Enter to
  send the message. 
* You should now see your message appearing in both windows

## Assignment
Here were the original guidelines for the project:

```
## Proposal of Work

Create an mqtt-backed chat application in a client/server Docker environment.

## Technologies
  - node.js
  - docker
  - mocha/chai for testing
  - your choice of MQTT broker
  - your choice of MQTT JS client
  - frontend framework optional

## Acceptance Criteria
  - the aplication can be start with a `docker-compose up`
  - the chat application can be started by visiting http://localhost:<port>
  - the chat app can have multiple channels
  - users can create channels
  - users can join channels
  - users can leave channels
  - user can talk to eachother in a channel
  - all features must be tested

## strech features
  - users can create accounts
  - users can login/out
  - messages persist between sessions ( requires database )

## Looking for
  - test coverage
  - creation and orchestration of a platform with docker
  - understanding of backend/front end decoupling and communication

```

## Setup
To run, go to the project's root folder and run `docker-compose up` (must have docker installed on your machine first). 


## Basic Project Structure
```
mqtt_assignment
  docker-compose.yml
  client
    docker-compose.yml
    Dockerfile.development
    public
      index.html
      index.js
      bundle.js
    test
      index.spec.js
  broker
    Dockerfile.development
```
