import { Prefix } from 'models/params/Prefix'
import { ComponentType } from 'models/ComponentType'

type ConnectionType = 'http' | 'tcp' | 'akka'

interface Connection {
  readonly prefix: Prefix
  readonly componentType: ComponentType
  readonly connectionType: ConnectionType
}

export class AkkaConnection implements Connection {
  readonly connectionType: ConnectionType = 'akka'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export class HttpConnection implements Connection {
  readonly connectionType: ConnectionType = 'http'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export class TcpConnection implements Connection {
  readonly connectionType: ConnectionType = 'tcp'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export type TypedConnection = AkkaConnection | HttpConnection | TcpConnection
