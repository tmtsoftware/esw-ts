import 'whatwg-fetch'
import * as D from 'io-ts/es6/Decoder'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { HttpTransport } from '../../src/utils/HttpTransport'

const postMockFn = jest.fn()
window.fetch = postMockFn // window object coming from DOM

const host = 'localhost'
const port = 1234
const url = `http://${host}:${port}/post-endpoint`
const expectedValue = { ok: true, status: 200 }
const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

const makeResponse = <T>(response: T): Response => {
  return new Response(JSON.stringify(response))
}

beforeAll(() => setAppConfigPath('../../test/assets/appconfig/AppConfig.ts'))
afterAll(() => setAppConfigPath(OLD_APP_CONFIG_PATH))

afterEach(() => jest.clearAllMocks())

describe('Http transport', () => {
  test('sends request with auth headers on providing token | ESW-312', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url, {
      tokenFactory: () => 'validToken',
      username: 'osw-user'
    })

    await httpTransport.requestRes<string>('hello', D.string)

    const headers = new HeaderExt()
      .withContentType('application/json')
      .withAuthorization('validToken')
      .withUsername('osw-user')
      .withHeader('App-Name', 'test-app')
    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: headers
    }

    expect(postMockFn).toBeCalledWith(url, expectedReq)
  })

  test('sends request without auth headers when no token is provided', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url, { username: 'osw-user' })

    await httpTransport.requestRes<string>('hello', D.string)

    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: new HeaderExt()
        .withContentType('application/json')
        .withUsername('osw-user')
        .withHeader('App-Name', 'test-app')
    }
    expect(postMockFn).toBeCalledWith(url, expectedReq)
  })
})
