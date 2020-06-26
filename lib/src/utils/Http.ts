import 'whatwg-fetch'
import { HeaderExt } from './HeaderExt'

type Method = 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE'

interface ReqParam<Req, Res> {
  path?: string
  payload?: Req
  headers?: Headers
  timeout?: number
  parser?: (res: Response) => Promise<Res>
}

const jsonHeader = () => new HeaderExt().withContentType('application/json')

const jsonResParser = (res: Response) => res.json()

const handleRequestTimeout = (timeout: number) => {
  const controller = new AbortController()
  if (timeout) {
    setTimeout(() => controller.abort(), timeout)
  }
  return controller
}

const fetchFor = (method: Method) => {
  return async <Req, Res>(
    hostname: string,
    port: number,
    {
      path = '',
      payload,
      headers = jsonHeader(),
      timeout = 120000,
      parser = jsonResParser
    }: ReqParam<Req, Res>
  ): Promise<Res> => {
    const controller = handleRequestTimeout(timeout)

    const body = payload ? bodySerializer(getContentType(headers))(payload) : undefined

    const fetchCall = fetch(`http://${hostname}:${port}/${path}`, {
      method: method,
      headers: headers,
      body: body,
      signal: controller.signal
    }).catch((err: Error) => {
      if (err.name === 'AbortError') throw new Error('Request timed out')
      throw new Error(err.message)
    })

    return parser(handleErrors(await fetchCall))
  }
}

export const post = fetchFor('POST')
export const get = fetchFor('GET')
export const put = fetchFor('PUT')
export const del = fetchFor('DELETE')
export const update = fetchFor('UPDATE')

const handleErrors = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText)
  return res
}

const urlencodedSerializer = (
  payload: string[][] | Record<string, string> | string | URLSearchParams
) => new URLSearchParams(payload).toString()

const serializers = new Map([
  ['application/json', JSON.stringify],
  ['application/x-www-form-urlencoded', urlencodedSerializer]
])

const getContentType = (headers: Headers) => headers.get('Content-Type') || 'application/json'
const bodySerializer = (contentType: string) => serializers.get(contentType) || JSON.stringify
