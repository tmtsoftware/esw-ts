import 'whatwg-fetch'
import { HeaderExt } from 'utils/HeaderExt'

type RequestConfig = {
  method: string
  headers: Headers
  body: string
}

export const post = async <Req, Res>(
  hostname: string,
  port: number,
  payload: Req,
  path = '',
  headers: Headers = new HeaderExt().withContentType('application/json')
): Promise<Res> => {
  const url = `http://${hostname}:${port}/${path}`
  return clientFetch(url, payload, 'POST', headers)
}

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

const bodySerializer = (headers: Headers) =>
  serializers.get(getContentType(headers)) || JSON.stringify

const clientFetch = async <Req, T>(
  url: string,
  payload: Req,
  method: 'POST' | 'GET',
  headers: Headers
): Promise<T> => {
  const request: RequestConfig = {
    method,
    headers,
    body: bodySerializer(headers)(payload)
  }

  return handleErrors(await fetch(url, request)).json()
}
