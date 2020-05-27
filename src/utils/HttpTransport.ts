import { addBearerToken, post } from 'utils/post'

export type TokenFactory = () => Promise<string>

export class HttpTransport<Req> {
  private readonly path = 'post-endpoint'

  constructor(
    readonly resolver: () => Promise<{ host: string; port: number }>,
    readonly tokenFactory: TokenFactory
  ) {}

  async requestRes<Res>(request: Req): Promise<Res> {
    const { host, port } = await this.resolver()
    const token = await this.tokenFactory()
    const headers = addBearerToken(token)
    return post<Req, Res>(host, port, request, this.path, headers)
  }
}
