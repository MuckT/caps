'use strict'

const io = require('socket.io')(3000)
const { v4: uuidv4 } = require('uuid')
const { logEvent } = require('./utils/logger')

// Simple queue
const queue = {}

// on connection -> console log that connection
io.on('connection', (socket) => {
  console.log('CORE', socket)
})

// Create the namespace 'caps'
const caps = io.of('/caps')
// on connection to caps
// console log the connection
caps.on('connection', (socket) => {
  console.log('Caps connected', socket.id)
  // join the room
  socket.on('join', room => {
    console.log(`created as room ${room}`)
    socket.join(room)
  })

  // Get all
  socket.on('get-all', (storeId) => {
    Object.keys(queue[storeId]).forEach(id => {
      socket.emit('to-deliver', { id, payload: queue[storeId][id] })
    })
  })

  // On to deliver read
  socket.on('received', eventObj => {
    console.log(`driver assigned ${eventObj} `)

    delete queue[eventObj.payload.storeId][eventObj.id]
    console.log('Queue Status: ', queue)
  })

  // pickup event
  socket.on('pickup', payload => {
    let id = uuidv4()
    queue[payload.storeId][id] = payload
    logEvent('pickup', payload)
    caps.emit('pickup', { id, payload })
  })

  // in-transit event
  socket.on('in-transit', payload => {
    logEvent('in-transit', payload)
    caps.emit('in-transit', payload)
  })

  // delivered event
  socket.on('delivered', payload => {
    logEvent('delivered', payload)
    caps.emit('delivered', payload)
  })
})
