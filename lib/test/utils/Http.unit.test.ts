import 'whatwg-fetch'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { post } from '../../src/utils/Http'

const fetchMockFn = jest.fn()
window.fetch = fetchMockFn // window object coming from DOM
const host = 'localhost'
const port = 1234
const url = `http://${host}:${port}/`

const jsonResHeaders = new HeaderExt().withContentType('application/json')
const textResHeaders = new HeaderExt().withContentType('application/text')

describe('Http util', () => {
  test('Post request', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue, jsonResHeaders))
    const payload = 'hello'
    const response = await post({ url, payload })

    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
    expect(response).toEqual(expectedValue)
  })

  test.each([
    ['json', '{}', jsonResHeaders, {}],
    ['text', 'error', textResHeaders, 'error']
  ])(
    'Post call throws error for %s error response | ESW-321',
    async (_, body, headers, expectedReason) => {
      fetchMockFn.mockResolvedValueOnce(makeErrorResponse(body, headers))
      const payload = 'hello'

      expect.assertions(4)
      await post({ url, payload }).catch((e) => {
        expect(e.status).toBe(404)
        expect(e.message).toBe('bad request')
        expect(e.reason).toEqual(expectedReason)
      })
      expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
    }
  )

  test('should be able to add Bearer token to Auth header', () => {
    const headers = new HeaderExt().withAuthorization('1234')

    expect(headers.get('Authorization')).toEqual('Bearer 1234')
  })

  test('should be able to serialize form body', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue, jsonResHeaders))
    const headers = new Headers([['Content-Type', 'application/x-www-form-urlencoded']])
    const payload = 'hello'
    const response = await post({ url, payload, headers })

    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
    expect(response).toEqual(expectedValue)
  })

  test('Post should throw error if fetch rejects', async () => {
    fetchMockFn.mockRejectedValueOnce(new Error())
    const payload = 'hello'

    await expect(post({ url, payload })).rejects.toThrow(Error)
    expect(window.fetch).toBeCalledWith(url, makeRequest(payload))
  })
})

const makeResponse = <T>(response: T, headers?: Headers): Response =>
  new Response(JSON.stringify(response), { headers })

const makeErrorResponse = (body: string, headers: Headers): Response =>
  new Response(body, { status: 404, statusText: 'bad request', headers: headers })

const makeRequest = (request: string) => ({
  method: 'POST',
  headers: new HeaderExt({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(request)
})
