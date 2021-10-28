'use strict'
const events = require('../utils/event-pool')
const faker = require('faker')
require('./driver')

let consoleSpy
let samplePayload

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log')
  samplePayload = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
})  

describe('Given Driver', () => {
  describe('When pickup event is emitted', () => {
    it('Then console log is correct', () => {
      events.emit('pickup', samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: picked up ${samplePayload.orderID}`)
    })
  })
  describe('When in-transit event is emitted', () => {
    it('Then console log is correct', () => {
      events.emit('in-transit', samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: in transit ${samplePayload.orderID}`)
    })
  })
  describe('When delivered event is emitted', () => {
    it('Then console log is correct', () => {
      events.emit('delivered', samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered ${samplePayload.orderID}`)
    })
  })
})
