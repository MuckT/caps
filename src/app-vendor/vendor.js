'use strict'

// Connecting to socket io as a client
const io = require('socket.io-client')

// connect to the caps
const socket = io.connect('http://localhost:3000/caps')

// Vendor functions
const handleDelivered = (eventObj) => {
  console.log(`Thank you, ${eventObj.customer}`)
}

// Assign handlers to listeners
socket.on('delivered', handleDelivered)

// Exports needed for testing
module.exports = {
  handleDelivered
}
