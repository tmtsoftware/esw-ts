import { Server } from 'mock-socket'
import { delay } from '../../integration/utils/eventually'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { Ws } from '../../src/utils/Ws'
import { wsMockWithResolved } from '../helpers/MockHelpers'

let mockServer: Server
const host = 'localhost'
const port = 8080

const url = `ws://${host}:${port}/websocket-endpoint`
const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(() => setAppConfigPath('../../test/assets/appconfig/AppConfig.ts'))
afterAll(() => setAppConfigPath(OLD_APP_CONFIG_PATH))

beforeEach(() => {
  mockServer = new Server(url)
})

afterEach(() => {
  mockServer.close()
})

describe('Web socket util', () => {
  test('should subscribe | ESW-312', () => {
    expect.assertions(2)

    return new Promise<void>((done) => {
      const expectedData = 'hello'
      const callBack = (data: string) => {
        expect(data).toEqual(expectedData)
        expect(mockServer.clients()[0].url).toEqual(`${url}?App-Name=test-app`)
        done()
      }
      wsMockWithResolved(expectedData, mockServer)
      new Ws(url).subscribe('hello', callBack)
    })
  })

  test('should get singleResponse', async () => {
    const expectedData = 'hello'
    wsMockWithResolved(expectedData, mockServer)

    expect.assertions(1)
    const data = await new Ws(url).singleResponse<string>('hello')
    expect(data).toEqual(expectedData)
  })

  test('should cancel subscription', async () => {
    wsMockWithResolved('', mockServer)
    expect.assertions(3)

    expect(mockServer.clients().length).toEqual(0)
    const subscription = new Ws(url).subscribe('hello', () => {
      expect(mockServer.clients().length).toEqual(1)
    })

    subscription.cancel()
    await delay(100)
    expect(mockServer.clients().length).toEqual(0)
  })
})
