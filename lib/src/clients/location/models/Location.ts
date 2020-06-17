import { AkkaConnection, Connection, HttpConnection, TcpConnection } from './Connection'

export interface Location {
  readonly _type: 'AkkaLocation' | 'HttpLocation' | 'TcpLocation'
  readonly connection: Connection
  readonly uri: string
}

export class AkkaLocation implements Location {
  readonly _type = 'AkkaLocation'
  constructor(readonly connection: AkkaConnection, readonly uri: string) {}
}

export class HttpLocation implements Location {
  readonly _type = 'HttpLocation'
  constructor(readonly connection: HttpConnection, readonly uri: string) {}
}

export class TcpLocation implements Location {
  readonly _type = 'TcpLocation'
  constructor(readonly connection: TcpConnection, readonly uri: string) {}
}
