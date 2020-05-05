import { Ws } from 'utils/Ws'
import { Server } from 'mock-socket'
import { wsMockWithResolved } from 'utils/MockHelpers'
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
  test('subscribe', () => {
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

  test('singleResponse', async () => {
    const expectedData = 'hello'
    wsMockWithResolved(expectedData, mockServer)

    const data = await new Ws(host, port).singleResponse<string>('hello')
    expect(data).toEqual(expectedData)
  })
})
