import 'whatwg-fetch'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { HttpTransport } from '../../src/utils/HttpTransport'
import * as D from 'io-ts/lib/Decoder'

const postMockFn = jest.fn()
window.fetch = postMockFn // window object coming from DOM
const host = 'localhost'
const port = 1234
const url = `http://${host}:${port}/post-endpoint`

const makeResponse = <T>(response: T): Response => {
  return new Response(JSON.stringify(response))
}

const expectedValue = { ok: true, status: 200 }

afterEach(() => jest.clearAllMocks())

describe('Http transport', () => {
  test('sends request with auth headers on providing token', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url, () => 'validToken')

    await httpTransport.requestRes<string>('hello', D.string)

    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: new HeaderExt().withContentType('application/json').withAuthorization('validToken')
    }
    expect(postMockFn).toBeCalledWith(url, expectedReq)
  })

  test('sends request without auth headers when no token is provided', async () => {
    postMockFn.mockResolvedValue(makeResponse(expectedValue))

    const httpTransport = new HttpTransport(url)

    await httpTransport.requestRes<string>('hello', D.string)

    const expectedReq = {
      method: 'POST',
      body: JSON.stringify('hello'),
      headers: new HeaderExt().withContentType('application/json')
    }
    expect(postMockFn).toBeCalledWith(url, expectedReq)
  })
})
