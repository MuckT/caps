'use strict'

// Imports
const events = require('./utils/event-pool')
const faker = require('faker')
const { logEvent } = require('./utils/logger')
require('./modules/driver')
require('./modules/vendor')

if(process.env.NODE_ENV === 'development') { 
  setInterval(() => {
    let payload = {
      store: faker.company.companyName(),
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress()
    }
    events.emit('pickup', payload)
    events.emit('in-transit', payload)
    events.emit('delivered', payload)
  }, 5000)
}

// Listen for events - Proof of life
events.on('pickup', (payload) => logEvent('pickup', payload))
events.on('in-transit', (payload) => logEvent('in-transit', payload))
events.on('delivered', (payload) => logEvent('delivered', payload))
