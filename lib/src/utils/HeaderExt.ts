import { UNKNOWN_USERNAME, USERNAME } from './Constants'

export class HeaderExt extends Headers {
  constructor(values?: HeadersInit) {
    super(values)
  }

  //TODO add tests for the helper methods
  withHeader(headerName: string, value: string) {
    super.set(headerName, value)
    return new HeaderExt(this)
  }

  withContentType(value: string) {
    return this.withHeader('Content-Type', value)
  }

  withUsername(value?: string) {
    return this.withHeader(USERNAME, value ? value : UNKNOWN_USERNAME)
  }

  withAuthorization(token?: string) {
    if (!token) return this
    return this.withHeader('Authorization', `Bearer ${token}`)
  }
}
