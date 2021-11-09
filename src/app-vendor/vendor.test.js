'use strict'

const faker = require('faker')
const { handleDelivered } = require('./vendor')
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
      handleDelivered(samplePayload)
      expect(consoleSpy).toHaveBeenCalledWith(`Thank you, ${samplePayload.customer}`)
    })
  })
})
