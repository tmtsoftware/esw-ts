import 'whatwg-fetch'
import { HeaderExt } from 'utils/HeaderExt'

export const post = async <Req, Res>(
  hostname: string,
  port: number,
  payload: Req,
  path = '',
  headers: Headers = new HeaderExt().withContentType('application/json')
): Promise<Res> =>
  handleErrors(
    await fetch(`http://${hostname}:${port}/${path}`, {
      method: 'POST',
      headers: headers,
      body: bodySerializer(getContentType(headers))(payload)
    })
  ).json()

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
