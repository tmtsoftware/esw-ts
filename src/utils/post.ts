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
  path = 'post-endpoint'
): Promise<Res> => {
  const url = `http://${hostname}:${port}/${path}`
  return clientFetch(url, payload, 'POST')
}

const headers = new Headers([['Content-Type', 'application/json']])

const handleErrors = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText)
  return res
}

const clientFetch = async <S, T>(url: string, payload: S, method: 'POST' | 'GET'): Promise<T> => {
  const request: RequestConfig = {
    method,
    headers,
    body: JSON.stringify(payload)
  }

  return new Promise((resolve, reject) =>
    fetch(url, request)
      .then(handleErrors)
      .then(async (response) => resolve(await response.json()))
      .catch((e) => reject(new Error(e.message)))
  )
}
