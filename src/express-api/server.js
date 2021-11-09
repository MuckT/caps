'use strict'

const io = require('socket.io-client')
const express = require('express')
const cors = require('cors')

const socket = io.connect('http://localhost:3000/caps')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Proof of life
app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

// Pickup
app.post('/pick-up', (req,res) => {
  socket.emit('pickup', req.body)
  res.status(200).json(req.body)
})

// In-transit
app.post('/in-transit', (req,res) => {
  socket.emit('in-transit', req.body)
  res.status(200).json(req.body)
})

// Delivered
app.post('/delivered', (req,res) => {
  socket.emit('delivered', req.body)
  res.status(200).json(req.body)
})

// Start server
module.exports = {
  app: app,
  start: app.listen(PORT, console.log(`Server started on Port ${PORT}`))
}
