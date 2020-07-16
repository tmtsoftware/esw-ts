import * as D from 'io-ts/lib/Decoder'
import { post } from './Http'
import { HeaderExt } from './HeaderExt'
import type { TokenFactory } from './TokenFactory'
import { getResponse } from './Utils'

export class HttpTransport<Req> {
  constructor(
    // todo: should this resolve on every request, msocket takes uri?
    readonly resolver: () => Promise<{ host: string; port: number }>,
    readonly tokenFactory: TokenFactory = () => undefined
  ) {}

  async requestRes<Res>(
    request: Req,
    decoder?: D.Decoder<unknown, Res>,
    timeoutInMillis?: number
  ): Promise<Res> {
    const { host, port } = await this.resolver()
    const endpoint = `http://${host}:${port}/post-endpoint`

    const token = this.tokenFactory()
    const headers = new HeaderExt().withContentType('application/json').withAuthorization(token)
    return post<Req, Res>({
      endpoint,
      headers,
      payload: request,
      timeout: timeoutInMillis,
      decoder: decoder ? (obj) => getResponse(decoder.decode(obj)) : decoder
    })
  }
}
