import 'whatwg-fetch'

export type RequestConfig = {
  method: string
  headers: Headers
  body: string
}

export const post = async <Req, Res>(
  hostname: string,
  port: number,
  payload: Req,
  path = 'post-endpoint',
  headers: Headers = defaultHeaders
): Promise<Res> => {
  const url = `http://${hostname}:${port}/${path}`
  return clientFetch(url, payload, 'POST', headers)
}

const defaultHeaders = new Headers([['Content-Type', 'application/json']])

export const addBearerToken = (token: string) => {
  defaultHeaders.append('Authorization', `Bearer ${token}`)
}

const handleErrors = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText)
  return res
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
    body: JSON.stringify(payload)
  }

  return handleErrors(await fetch(url, request)).json()
}
