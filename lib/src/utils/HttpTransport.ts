import { post } from './Http'
import { HeaderExt } from './HeaderExt'
import type { TokenFactory } from './TokenFactory'
import { getOrThrow } from './Utils'
import { Decoder } from './Decoder'

export class HttpTransport<Req> {
  constructor(readonly url: string, readonly tokenFactory: TokenFactory = () => undefined) {}

  async requestRes<Res>(
    request: Req,
    decoder: Decoder<Res>,
    timeoutInMillis?: number
  ): Promise<Res> {
    const token = this.tokenFactory()
    const headers = new HeaderExt().withContentType('application/json').withAuthorization(token)
    return post<Req, Res>({
      headers,
      url: this.url,
      payload: request,
      timeout: timeoutInMillis,
      decoder: decoder ? (obj) => getOrThrow(decoder.decode(obj)) : decoder
    })
  }
}
