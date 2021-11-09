'use strict'

const supertest = require('supertest')
const server = require('./server')
const mockRequest = supertest(server.app)
const faker = require('faker')

let requestBody

describe("Given '/'", () => {
  describe('When GET', () => {
    it('Then returns 200 status', async () => {
      const response = await mockRequest.get('/')
      expect(response.status).toEqual(200)
    })

    it('Then returns correct response body', async () => {
      const response = await mockRequest.get('/')
      expect(response.text).toEqual('Hello World!')
    })
  })
})

describe("Given '/pickup'", () => {
  beforeEach(() => {
    requestBody = {
      store: faker.company.companyName(),
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  })

  describe('When POST', () => {
    it('Then returns 200 status', async () => {
      const response = await mockRequest.post('/pick-up').send(requestBody)
      expect(response.status).toEqual(200)
    })

    it('Then returns correct response body', async () => {
      const response = await mockRequest.post('/pick-up').send(requestBody)
      expect(response.body).toEqual(requestBody)
    })
  })
})

describe("Given '/in-transit'", () => {
  beforeEach(() => {
    requestBody = {
      store: faker.company.companyName(),
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  })

  describe('When POST', () => {
    it('Then returns 200 status', async () => {
      const response = await mockRequest.post('/in-transit').send(requestBody)
      expect(response.status).toEqual(200)
    })

    it('Then returns correct response body', async () => {
      const response = await mockRequest.post('/in-transit').send(requestBody)
      expect(response.body).toEqual(requestBody)
    })
  })
})

describe("Given '/delivered'", () => {
  beforeEach(() => {
    requestBody = {
      store: faker.company.companyName(),
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  })

  describe('When POST', () => {
    it('Then returns 200 status', async () => {
      const response = await mockRequest.post('/delivered').send(requestBody)
      expect(response.status).toEqual(200)
    })

    it('Then returns correct response body', async () => {
      const response = await mockRequest.post('/delivered').send(requestBody)
      expect(response.body).toEqual(requestBody)
    })
  })
})
