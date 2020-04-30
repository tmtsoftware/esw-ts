import {
  AkkaConnection,
  HttpConnection,
  TcpConnection,
  Connection
} from 'clients/location/models/Connection'

export interface LocationI {
  readonly _type: 'AkkaLocation' | 'HttpLocation' | 'TcpLocation'
  readonly connection: Connection
  readonly uri: string
}

export class AkkaLocation implements LocationI {
  readonly _type = 'AkkaLocation'
  constructor(readonly connection: AkkaConnection, readonly uri: string) {}
}

export class HttpLocation implements LocationI {
  readonly _type = 'HttpLocation'
  constructor(readonly connection: HttpConnection, readonly uri: string) {}
}

export class TcpLocation implements LocationI {
  readonly _type = 'TcpLocation'
  constructor(readonly connection: TcpConnection, readonly uri: string) {}
}

export type Location = AkkaLocation | HttpLocation | TcpLocation
