export class HeaderExt extends Headers {
  constructor(values?: HeadersInit) {
    super(values)
  }

  withHeader(headerName: string, value: string) {
    super.set(headerName, value)
    return new HeaderExt(this)
  }

  withContentType(value: string) {
    return this.withHeader('Content-Type', value)
  }

  withAuthorization(token?: string) {
    if (!token) return this
    return this.withHeader('Authorization', `Bearer ${token}`)
  }
}
