import {
  AkkaConnection,
  HttpConnection,
  TcpConnection,
  Connection
} from 'clients/location/models/Connection'

export interface RegistrationI {
  readonly _type: 'HttpRegistration' | 'AkkaRegistration' | 'TcpRegistration'
  readonly connection: Connection
}

export class HttpRegistration implements RegistrationI {
  readonly _type: 'HttpRegistration' = 'HttpRegistration'
  constructor(readonly connection: HttpConnection, readonly port: number, readonly path: string) {}
}

export class AkkaRegistration implements RegistrationI {
  readonly _type: 'AkkaRegistration' = 'AkkaRegistration'
  constructor(readonly connection: AkkaConnection, readonly actorRefURI: string) {}
}

export class TcpRegistration implements RegistrationI {
  readonly _type: 'TcpRegistration' = 'TcpRegistration'
  constructor(readonly connection: TcpConnection, readonly port: number) {}
}

export type Registration = AkkaRegistration | TcpRegistration | HttpRegistration
