'use strict'
const events = require('../utils/event-pool')
const faker = require('faker')
require('./vendor')

let consoleSpy
let samplePayload

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  samplePayload = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
})

afterEach(() => {
  consoleSpy.mockRestore()
})

describe('Given Vendor', () => {
  describe('When delivered event is emitted', () => {
    it('Then console log is correct', () => {
      events.emit('delivered', samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`Thank you, ${samplePayload.customer}`)
    })
  })
})
