'use strict'

const faker = require('faker')
const { logEvent } = require('./logger')

let consoleSpy, samplePayload

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  samplePayload = {
    storeId: faker.datatype.uuid(),
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
})




describe('Given logEvent', () => {
  describe('When logEvent has event', () => {
    it('Then logs correct body', () => {
      logEvent('test-event', samplePayload)
      expect(consoleSpy).toHaveBeenCalled()
    })
  })
})
