import { post } from 'utils/post'
import { HeaderExt } from 'utils/HeaderExt'

export type TokenFactory = () => string | undefined

export class HttpTransport<Req> {
  private readonly path = 'post-endpoint'

  constructor(
    readonly resolver: () => Promise<{ host: string; port: number }>,
    readonly tokenFactory: TokenFactory = () => undefined
  ) {}

  async requestRes<Res>(request: Req): Promise<Res> {
    const { host, port } = await this.resolver()
    const token = await this.tokenFactory()
    if (token) {
      const headers = new HeaderExt().withContentType('application/json').withAuthorization(token)
      return post<Req, Res>(host, port, request, this.path, headers)
    } else {
      return post<Req, Res>(host, port, request, this.path)
    }
  }
}
