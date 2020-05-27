import 'whatwg-fetch'

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
  headers: Headers = getDefaultHeaders()
): Promise<Res> => {
  const url = `http://${hostname}:${port}/${path}`
  return clientFetch(url, payload, 'POST', headers)
}

export const getDefaultHeaders = () => new Headers([['Content-Type', 'application/json']])

export const addBearerToken = (token: string, headers: Headers = getDefaultHeaders()) => {
  headers.append('Authorization', `Bearer ${token}`)
  return headers
}

const handleErrors = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText)
  return res
}

const serializers = new Map()
serializers.set('application/json', JSON.stringify)
serializers.set(
  'application/x-www-form-urlencoded',
  (payload: string[][] | Record<string, string> | string | URLSearchParams) => {
    return new URLSearchParams(payload).toString()
  }
)

const bodySerializer = (headers: Headers) => {
  return serializers.get(headers.get('Content-Type')) || JSON.stringify
}

const clientFetch = async <S, T>(
  url: string,
  payload: S,
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
