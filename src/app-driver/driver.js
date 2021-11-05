'use strict'

// connecting to socket io as a client
const io = require('socket.io-client')

// connect to the caps
const socket = io.connect('http://localhost:3000/caps')

// Driver functions
const handlePickup = (eventObj) => {
  console.log(`DRIVER: picked up ${eventObj.orderID}`)
}

const handleInTransit = (eventObj) => {
  console.log(`DRIVER: in transit ${eventObj.orderID}`)
}

const handleDelivered = (eventObj) => {
  console.log(`DRIVER: delivered ${eventObj.orderID}`)
}

// Assign handlers to listeners
socket.on('pickup', handlePickup)
socket.on('in-transit', handleInTransit)
socket.on('delivered', handleDelivered)

// Exports needed for testing
module.exports = {
  handlePickup,
  handleInTransit,
  handleDelivered
}
