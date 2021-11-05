'use strict'

const logEvent = (event, payload) => {
  let time = new Date()
  console.log('EVENT', { event, time, payload})
}

module.exports = {
  logEvent
}
