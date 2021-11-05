'use strict'

// Access to our event queue
const events = require('../utils/event-pool')

// Vender functions
const handleDelivered = (eventObj) => {
  console.log(`Thank you, ${eventObj.customer}`)
}

// Assign handlers to listeners
events.on('delivered', handleDelivered)

// Exports needed for testing
module.exports = {
  handleDelivered
}
