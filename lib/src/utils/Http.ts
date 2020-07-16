import 'whatwg-fetch'
import { HeaderExt } from './HeaderExt'

type Method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE'

export interface FetchRequest<Req, Res> {
  endpoint: string
  parameters?: Record<string, string>
  payload?: Req
  headers?: Headers
  timeout?: number
  responseMapper?: (res: Response) => Promise<Res>
  decoder?: (a: any) => Res
}

export type RequestResponse = <Req, Res>(request: FetchRequest<Req, Res>) => Promise<Res>

const jsonHeader = () => new HeaderExt().withContentType('application/json')
const toJson = (res: Response) => res.json()

const handleRequestTimeout = (timeout: number) => {
  const controller = new AbortController()
  if (timeout) {
    setTimeout(() => controller.abort(), timeout)
  }
  return controller
}

const paramString = (parameters: Record<string, string>) =>
  Object.entries(parameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

const fetchMethod = (method: Method): RequestResponse => {
  return async <Req, Res>(request: FetchRequest<Req, Res>) => {
    const {
      endpoint,
      payload,
      parameters,
      headers = jsonHeader(),
      timeout = 120000,
      responseMapper = toJson,
      decoder = (a: any) => a
    } = request

    const controller = handleRequestTimeout(timeout)
    const path = parameters ? `${endpoint}?${paramString(parameters)}` : endpoint
    const body = payload ? bodySerializer(getContentType(headers))(payload) : undefined

    const fetchCall = fetch(path, {
      method: method,
      headers: headers,
      body: body,
      signal: controller.signal
    }).catch((err: Error) => {
      if (err.name === 'AbortError') throw new Error('Request timed out')
      throw new Error(err.message)
    })

    const response = await responseMapper(handleErrors(await fetchCall))
    return decoder(response)
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
  ['application/x-www-form-urlencoded', urlencodedSerializer],
  ['application/octet-stream', <Req>(req: Req) => req]
])

const getContentType = (headers: Headers) => headers.get('Content-Type') || 'application/json'
const bodySerializer = (contentType: string) => serializers.get(contentType) || JSON.stringify
