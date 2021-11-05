'use strict'

// Access to our Event Queue
const events = require('../utils/event-pool')

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
events.on('pickup', handlePickup)
events.on('in-transit', handleInTransit)
events.on('delivered', handleDelivered)

// Exports needed for testing
module.exports = {
  handlePickup,
  handleInTransit,
  handleDelivered
}
