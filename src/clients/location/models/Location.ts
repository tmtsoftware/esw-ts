import {
  AkkaConnection,
  HttpConnection,
  TcpConnection,
  TypedConnection
} from 'clients/location/models/Connection'

export interface Location {
  readonly _type: 'AkkaLocation' | 'HttpLocation' | 'TcpLocation'
  readonly connection: TypedConnection
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

export type TypedLocation = AkkaLocation | HttpLocation | TcpLocation
