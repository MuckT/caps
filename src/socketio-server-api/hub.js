'use strict'

const io = require('socket.io')(3000)
const { logEvent } = require('./utils/logger')

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

  // pickup event
  socket.on('pickup', payload => {
    logEvent('pickup', payload)
    caps.emit('pickup', payload)
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
