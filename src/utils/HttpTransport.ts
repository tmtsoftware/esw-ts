import { post } from './Post'
import { HeaderExt } from './HeaderExt'

export type TokenFactory = () => string | undefined

export class HttpTransport<Req> {
  private readonly path = 'post-endpoint'

  constructor(
    // todo: should this resolve on every request, msocket takes uri?
    readonly resolver: () => Promise<{ host: string; port: number }>,
    readonly tokenFactory: TokenFactory = () => undefined
  ) {}

  async requestRes<Res>(request: Req): Promise<Res> {
    const { host, port } = await this.resolver()
    const token = this.tokenFactory()
    if (token) {
      const headers = new HeaderExt().withContentType('application/json').withAuthorization(token)
      return post<Req, Res>(host, port, request, this.path, headers)
    } else {
      return post<Req, Res>(host, port, request, this.path)
    }
  }
}
