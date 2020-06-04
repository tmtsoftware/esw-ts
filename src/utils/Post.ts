import 'whatwg-fetch'
import { HeaderExt } from './HeaderExt'

const handleRequestTimeout = (timeout: number) => {
  const controller = new AbortController()
  if (timeout) {
    setTimeout(() => controller.abort(), timeout)
  }
  return controller
}

export const post = async <Req, Res>(
  hostname: string,
  port: number,
  payload: Req,
  path = '',
  headers: Headers = new HeaderExt().withContentType('application/json'),
  timeout = 120000
): Promise<Res> => {
  const controller = handleRequestTimeout(timeout)

  const fetchCall = fetch(`http://${hostname}:${port}/${path}`, {
    method: 'POST',
    headers: headers,
    body: bodySerializer(getContentType(headers))(payload),
    signal: controller.signal
  }).catch((err: Error) => {
    if (err.name === 'AbortError') throw new Error('Request timed out')
    throw new Error(err.message)
  })

  return handleErrors(await fetchCall).json()
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
const bodySerializer = (contentType: string) => serializers.get(contentType) || JSON.stringify
