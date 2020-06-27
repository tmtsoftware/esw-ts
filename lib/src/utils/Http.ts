import 'whatwg-fetch'
import { HeaderExt } from './HeaderExt'

type Method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE'

export interface FetchRequest<Req, Res> {
  endpoint: string
  payload?: Req
  headers?: Headers
  timeout?: number
  responseMapper?: (res: Response) => Promise<Res>
}

const jsonHeader = () => new HeaderExt().withContentType('application/json')
const toJson = (res: Response) => res.json()

const handleRequestTimeout = (timeout: number) => {
  const controller = new AbortController()
  if (timeout) {
    setTimeout(() => controller.abort(), timeout)
  }
  return controller
}

const fetchMethod = (method: Method) => {
  return async <Req, Res>({
    endpoint,
    payload,
    headers = jsonHeader(),
    timeout = 120000,
    responseMapper = toJson
  }: FetchRequest<Req, Res>): Promise<Res> => {
    const controller = handleRequestTimeout(timeout)

    const body = payload ? bodySerializer(getContentType(headers))(payload) : undefined

    const fetchCall = fetch(endpoint, {
      method: method,
      headers: headers,
      body: body,
      signal: controller.signal
    }).catch((err: Error) => {
      if (err.name === 'AbortError') throw new Error('Request timed out')
      throw new Error(err.message)
    })

    return responseMapper(handleErrors(await fetchCall))
  }
}

export const post = fetchMethod('POST')
export const get = fetchMethod('GET')
export const put = fetchMethod('PUT')
export const del = fetchMethod('DELETE')
export const head = fetchMethod('HEAD')

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
