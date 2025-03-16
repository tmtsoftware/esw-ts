/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import 'whatwg-fetch'
import * as D from 'io-ts/lib/Decoder'
import { setAppName } from '../../src/config/AppName'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { HttpTransport } from '../../src/utils/HttpTransport'

const postMockFn = jest.fn()
window.fetch = postMockFn // window object coming from DOM

const host = 'localhost'
const port = 1234
const url = `http://${host}:${port}/post-endpoint`
const expectedValue = { ok: true, status: 200 }
const OLD_APP_CONFIG_PATH = ''

const makeResponse = <T>(response: T): Response => {
  return new Response(JSON.stringify(response))
}

beforeAll(() => setAppName('test-app'))
afterAll(() => setAppName(OLD_APP_CONFIG_PATH))

afterEach(() => jest.clearAllMocks())

describe('Http transport', () => {
  test('sends request with auth headers on providing token | ESW-312, ESW-531', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url, {
      tokenFactory: () => 'validToken',
      username: 'osw-user'
    })

    await httpTransport.requestRes<string>('hello', D.string)

    const headers = new HeaderExt()
      .withContentType('application/json')
      .withAuthorization('validToken')
      .withHeader('X-TMT-Username', 'osw-user')
      .withHeader('X-TMT-App-Name', 'test-app')
    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: headers
    }

    expect(postMockFn).toHaveBeenCalledWith(url, expectedReq)
  })

  test('sends request without auth headers when no token is provided | ESW-531', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url, { username: 'osw-user' })

    await httpTransport.requestRes<string>('hello', D.string)

    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: new HeaderExt()
        .withContentType('application/json')
        .withUsername('osw-user')
        .withHeader('X-TMT-App-Name', 'test-app')
    }
    expect(postMockFn).toHaveBeenCalledWith(url, expectedReq)
  })
})
