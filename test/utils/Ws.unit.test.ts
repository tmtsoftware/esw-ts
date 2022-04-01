/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as D from 'io-ts/lib/Decoder'
import { Server } from 'mock-socket'
import { delay } from '../../integration/utils/eventually'
import type { ServiceError } from '../../src'
import { setAppName } from '../../src/config/AppName'
import { SERVER_ERROR, Ws } from '../../src/utils/Ws'
import { noop } from '../helpers/JestMockHelpers'
import { closeServer, wsMockWithResolved } from '../helpers/MockHelpers'

let mockServer: Server
const host = 'localhost'
const port = 8080

const url = `ws://${host}:${port}/websocket-endpoint`
const OLD_APP_CONFIG_PATH = ''

beforeAll(() => setAppName('test-app'))
afterAll(() => setAppName(OLD_APP_CONFIG_PATH))

beforeEach(() => {
  mockServer = new Server(url)
})

afterEach(() => {
  mockServer.close()
})

describe('Web socket util', () => {
  test('should subscribe | ESW-312, ESW-531', () => {
    expect.assertions(2)

    return new Promise<void>((done) => {
      const expectedData = 'ping'
      const callBack = (data: string) => {
        expect(data).toEqual(expectedData)
        expect(mockServer.clients()[0].url).toEqual(`${url}?appName=test-app&username=esw-user`)
        done()
      }
      wsMockWithResolved('"ping"', mockServer)
      new Ws(url, 'esw-user').subscribe('pong', callBack)
    })
  })

  test('should get singleResponse', async () => {
    const expectedData = 'ping'
    wsMockWithResolved('"ping"', mockServer)

    expect.assertions(1)
    const data = await new Ws(url).singleResponse<string>('pong', D.string)
    expect(data).toEqual(expectedData)
  })

  test('should cancel subscription', async () => {
    const emptyMessage = '""'
    wsMockWithResolved(emptyMessage, mockServer)
    expect.assertions(3)

    expect(mockServer.clients().length).toEqual(0)
    const subscription = new Ws(url).subscribe('hello', () => {
      expect(mockServer.clients().length).toEqual(1)
    })

    subscription.cancel()
    await delay(100)
    expect(mockServer.clients().length).toEqual(0)
  })
  test('should call onError handle on decode error & recieved server sent message | ESW-510', () => {
    return new Promise<void>(async (done) => {
      const message = 1234
      wsMockWithResolved(message, mockServer)
      expect.assertions(3)
      const onerror = (error: ServiceError) => {
        expect(error.message).toBe(1234)
        expect(error.status).toBe(SERVER_ERROR.code)
        expect(error.statusText).toBe('cannot decode 1234, should be string')
        done()
      }

      const subscription = new Ws(url).subscribe(message, noop, D.string, (error) => onerror(error))

      subscription.cancel()
    })
  })
  test('should call onError handle on getting error while parsing message | ESW-510', () => {
    return new Promise<void>(async (done) => {
      const message = '{123}'
      expect.assertions(2)
      wsMockWithResolved(message, mockServer)

      const onerror = (error: ServiceError) => {
        expect(error.status).toBe(SERVER_ERROR.code)
        expect(error.message).toBe('Unexpected number in JSON at position 1')
        done()
      }

      const subscription = new Ws(url).subscribe(message, noop, undefined, (err) => onerror(err))
      await delay(400)
      subscription.cancel()
    })
  })
  test('should call onClose handle on connection close | ESW-510', () => {
    return new Promise<void>(async (done) => {
      const message = '{123}'
      expect.assertions(1)
      wsMockWithResolved(message, mockServer)

      const onClose = () => {
        expect(true).toBe(true)
        done()
      }

      new Ws(url).subscribe(message, noop, undefined, undefined, onClose)
      await delay(400)
      //on closing server, client's onClose callback should get triggered.
      closeServer(mockServer)
    })
  })
})
