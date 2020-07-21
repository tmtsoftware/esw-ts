import { HeaderExt } from '../../src/utils/HeaderExt'
import { post } from '../../src/utils/Http'

const fetchMockFn = jest.fn()
window.fetch = fetchMockFn // window object coming from DOM
const host = 'localhost'
const port = 1234
const endpoint = `http://${host}:${port}/`

describe('Http util', () => {
  test('Post request', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue))
    const payload = 'hello'
    const response = await post({ endpoint, payload })

    expect(window.fetch).toBeCalledWith(endpoint, makeRequest(payload))
    expect(response).toEqual(expectedValue)
  })

  test('Post throws error', async () => {
    fetchMockFn.mockResolvedValueOnce(makeErrorResponse())
    const payload = 'hello'

    await expect(post({ endpoint, payload })).rejects.toThrow(Error)
    expect(window.fetch).toBeCalledWith(endpoint, makeRequest(payload))
  })

  test('should be able to add Bearer token to Auth header', () => {
    const headers = new HeaderExt().withAuthorization('1234')

    expect(headers.get('Authorization')).toEqual('Bearer 1234')
  })

  test('should be able to serialize form body', async () => {
    const expectedValue = { ok: true, status: 200 }
    fetchMockFn.mockResolvedValueOnce(makeResponse(expectedValue))
    const headers = new Headers([['Content-Type', 'application/x-www-form-urlencoded']])
    const payload = 'hello'
    const response = await post({ endpoint, payload, headers })

    expect(window.fetch).toBeCalledWith(endpoint, makeRequest(payload))
    expect(response).toEqual(expectedValue)
  })

  test('Post should throw error if fetch rejects', async () => {
    fetchMockFn.mockRejectedValueOnce(new Error())
    const payload = 'hello'

    await expect(post({ endpoint, payload })).rejects.toThrow(Error)
    expect(window.fetch).toBeCalledWith(endpoint, makeRequest(payload))
  })
})

const makeResponse = <T>(response: T): Response => new Response(JSON.stringify(response))

const makeErrorResponse = (): Response =>
  new Response('', { status: 404, statusText: 'bad request' })

const makeRequest = (request: string) => ({
  method: 'POST',
  headers: new HeaderExt({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(request)
})
