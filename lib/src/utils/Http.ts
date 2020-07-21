import 'whatwg-fetch'
import { identity } from 'fp-ts/lib/function'
import { HeaderExt } from './HeaderExt'

type Method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE'

export interface FetchRequest<Req, Res> {
  url: string
  queryParams?: Record<string, string>
  payload?: Req
  headers?: Headers
  timeout?: number
  responseMapper?: (res: Response) => Promise<Res>
  decoder?: (a: any) => Res
}

export type RequestResponse = <Req, Res>(request: FetchRequest<Req, Res>) => Promise<Res>

const jsonHeader = () => new HeaderExt().withContentType('application/json')
const toJson = (res: Response) => res.json()

const queryString = (queryParams: Record<string, string>) =>
  Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

const withTimeout = <T>(ms: number, promise: Promise<T>): Promise<T> => {
  const timeout: Promise<T> = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  )
  return Promise.race([timeout, promise])
}

const fullUrl = (url: string, queryParams?: Record<string, string>) =>
  queryParams ? `${url}?${queryString(queryParams)}` : url

const fetchMethod = (method: Method): RequestResponse => {
  return async <Req, Res>(request: FetchRequest<Req, Res>) => {
    const {
      url,
      payload,
      queryParams,
      headers = jsonHeader(),
      timeout = 120000,
      responseMapper = toJson,
      decoder = identity
    } = request

    const path = fullUrl(url, queryParams)
    const body = payload ? bodySerializer(getContentType(headers))(payload) : undefined

    const fetchResponse = withTimeout(timeout, fetch(path, { method, headers, body }))

    const response = await responseMapper(handleErrors(await fetchResponse))
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
