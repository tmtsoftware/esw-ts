import { Ws } from '../../src/utils/Ws'
import { Server } from 'mock-socket'
import { wsMockWithResolved } from './MockHelpers'
let mockServer: Server
const host = 'localhost'
const port = 8080

beforeEach(() => {
  mockServer = new Server(`ws://${host}:${port}/websocket-endpoint`)
})

afterEach(() => {
  mockServer.close()
})

describe('Web socket util', () => {
  test('should subscribe', () => {
    return new Promise((done) => {
      const expectedData = 'hello'
      const fn = (data: string) => {
        expect(data).toEqual(expectedData)
        done()
      }
      wsMockWithResolved(expectedData, mockServer)
      new Ws(host, port).subscribe('hello', fn)
    })
  })

  test('should get singleResponse', async () => {
    const expectedData = 'hello'
    wsMockWithResolved(expectedData, mockServer)

    const data = await new Ws(host, port).singleResponse<string>('hello')
    expect(data).toEqual(expectedData)
  })

  test('should cancel subscription ', () => {
    wsMockWithResolved('', mockServer)

    expect(mockServer.clients().length).toEqual(0)
    const subscription = new Ws(host, port).subscribe('hello', () => ({}))

    expect(mockServer.clients().length).toEqual(1)
    subscription.cancel()

    return new Promise((done) =>
      setTimeout(() => {
        expect(mockServer.clients().length).toEqual(0)
        done()
      }, 1000)
    )
  })
})
