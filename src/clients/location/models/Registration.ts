import {
  AkkaConnection,
  Connection,
  HttpConnection,
  TcpConnection
} from 'clients/location/models/Connection'

export interface Registration {
  readonly _type: 'HttpRegistration' | 'AkkaRegistration' | 'TcpRegistration'
  readonly connection: Connection
}

export class HttpRegistration implements Registration {
  readonly _type: 'HttpRegistration' = 'HttpRegistration'
  constructor(readonly connection: HttpConnection, readonly port: number, readonly path: string) {}
}

export class AkkaRegistration implements Registration {
  readonly _type: 'AkkaRegistration' = 'AkkaRegistration'
  constructor(readonly connection: AkkaConnection, readonly actorRefURI: string) {}
}

export class TcpRegistration implements Registration {
  readonly _type: 'TcpRegistration' = 'TcpRegistration'
  constructor(readonly connection: TcpConnection, readonly port: number) {}
}
