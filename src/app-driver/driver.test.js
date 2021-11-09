'use strict'

const faker = require('faker')
const { handlePickup, handleInTransit, handleDelivered } = require('./driver')

let consoleSpy, samplePayload


beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  samplePayload = {
    storeId: faker.datatype.uuid(),
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
})

afterEach(() => {
  consoleSpy.mockRestore()
})

describe('Given Driver', () => {
  describe('When pickup event is emitted', () => {
    it('Then console log is correct', () => {
      handlePickup(samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: picked up ${samplePayload.orderId}`)
    })
  })
  describe('When in-transit event is emitted', () => {
    it('Then console log is correct', () => {
      handleInTransit(samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: in transit ${samplePayload.orderId}`)
    })
  })
  describe('When delivered event is emitted', () => {
    it('Then console log is correct', () => {
      handleDelivered(samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered ${samplePayload.orderId}`)
    })
  })
})
