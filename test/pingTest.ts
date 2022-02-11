import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { router } from '../src/app/router'
import Server from '../src/app/server'
import assert from 'assert'

let app: Express
let server: any

beforeAll(async () => {
  server = new Server(router)
  server.start()
  app = server.getApp()
})

afterAll(() => {
  server.destroy()
})

describe('GET /ping', function () {
  it('responds with pong', async () => {
    // Given
    const url = '/ping'
    const expectedResponse = 'pong'

    // Act
    const response = await request(app)
      .get(url)
      .expect(200)

    // Assertions
    assert(response.body, expectedResponse)
    expect(response.status).toEqual(200)
  });
});