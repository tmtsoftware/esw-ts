import { Prefix } from 'models/params/Prefix'
import { ComponentType } from 'models/ComponentType'

interface ConnectionI {
  readonly prefix: Prefix
  readonly componentType: ComponentType
  readonly connectionType: 'http' | 'tcp' | 'akka'
}

export class AkkaConnection implements ConnectionI {
  readonly connectionType: 'akka' = 'akka'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export class HttpConnection implements ConnectionI {
  readonly connectionType: 'http' = 'http'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export class TcpConnection implements ConnectionI {
  readonly connectionType: 'tcp' = 'tcp'
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export type Connection = AkkaConnection | HttpConnection | TcpConnection
