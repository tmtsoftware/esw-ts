import 'whatwg-fetch'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { post } from '../../src/utils/Http'

const fetchMockFn = jest.fn()
window.fetch = fetchMockFn // window object coming from DOM

const host = 'localhost'
const port = 1234
const url = `http://${host}:${port}/`
const jsonResHeaders = new HeaderExt().withContentType('application/json')
const textResHeaders = new HeaderExt().withContentType('application/text')
const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(() => setAppConfigPath('../../test/assets/appconfig/AppConfig.ts'))
afterAll(() => setAppConfigPath(OLD_APP_CONFIG_PATH))

afterEach(() => jest.clearAllMocks())

describe('Http util', () => {
  test('Post should throw generic error exception if there is an internal service error | ESW-321', async () => {
    const invalidComponent = {
      _type: 'InvalidComponent',
      error_message: 'testHcd.hcd not found'
    }
    const internalError = new Response(JSON.stringify(invalidComponent), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: jsonResHeaders
    })

    fetchMockFn.mockResolvedValueOnce(internalError)
    const payload = 'hello'

    expect.assertions(5)
    await post({ url, payload }).catch((e) => {
      expect(e.errorType).toBe('InvalidComponent')
      expect(e.message).toEqual('testHcd.hcd not found')
      expect(e.status).toBe(500)
      expect(e.statusText).toBe('Internal Server Error')
    })

    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
  })

  test.each([
    [
      'json',
      JSON.stringify({ error_message: 'error' }),
      jsonResHeaders,
      { error_message: 'error' }
    ],
    ['text', 'error', textResHeaders, 'error']
  ])(
    'Post call throws error for %s error response | ESW-321',
    async (_, body, headers, expectedMessage) => {
      fetchMockFn.mockResolvedValueOnce(makeErrorResponse(body, headers))
      const payload = 'hello'

      expect.assertions(5)
      await post({ url, payload }).catch((e) => {
        expect(e.errorType).toBe('TransportError')
        expect(e.message).toEqual(expectedMessage)
        expect(e.status).toBe(404)
        expect(e.statusText).toBe('bad request')
      })
      expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
    }
  )

  test('Post request', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue, jsonResHeaders))
    const payload = 'hello'
    const response = await post({ url, payload })

    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
    expect(response).toEqual(expectedValue)
  })

  test('should add metric headers in request | ESW-312', async () => {
    fetchMockFn.mockResolvedValueOnce(makeResponse(undefined))

    await post({ url, payload: 'hello' })

    const fetchArgument = 1
    expect(fetchMockFn.mock.calls[0][fetchArgument].headers).toEqual(
      new HeaderExt({
        'Content-Type': 'application/json',
        'App-Name': 'test-app'
      })
    )
  })

  test('should be able to add Bearer token to Auth header', () => {
    const headers = new HeaderExt().withAuthorization('1234')

    expect(headers.get('Authorization')).toEqual('Bearer 1234')
  })

  test('should be able to serialize form body', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue, jsonResHeaders))
    const headers = new HeaderExt({ 'Content-Type': 'application/x-www-form-urlencoded' })
    const payload = 'hello'
    const response = await post({ url, payload, headers })

    expect(window.fetch).toBeCalledWith(url, {
      method: 'POST',
      headers: new HeaderExt({
        'Content-Type': 'application/x-www-form-urlencoded',
        'App-Name': 'test-app'
      }),
      body: 'hello='
    })
    expect(response).toEqual(expectedValue)
  })

  test('Post should throw error if fetch rejects', async () => {
    fetchMockFn.mockRejectedValueOnce(new Error())
    const payload = 'hello'

    await expect(post({ url, payload })).rejects.toThrow(Error)
    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
  })

  test('should be able to make url with query params', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue, jsonResHeaders))
    const payload = 'hello'
    const queryParams = {
      a: 'b'
    }

    await post({ url, payload, queryParams })

    expect(window.fetch).toBeCalledWith(`${url}?a=b`, makeRequest(payload))
  })
})

const makeResponse = <T>(response: T, headers?: Headers): Response =>
  new Response(JSON.stringify(response), { headers })

const makeErrorResponse = (body: string, headers: Headers): Response =>
  new Response(body, { status: 404, statusText: 'bad request', headers: headers })

const makeRequest = (request: string) => ({
  method: 'POST',
  headers: new HeaderExt({
    'Content-Type': 'application/json',
    'App-Name': 'test-app'
  }),
  body: JSON.stringify(request)
})
