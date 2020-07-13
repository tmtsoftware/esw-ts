import * as t from 'io-ts'
import { ComponentType, Prefix, PrefixV } from '../../../models'

const akka = t.literal('akka')
const http = t.literal('http')
const tcp = t.literal('tcp')

const ConnectionType = t.union([akka, http, tcp])
export type ConnectionType = t.TypeOf<typeof ConnectionType>

const connectionT = <T extends ConnectionType>(connectionType: t.LiteralType<T>) =>
  t.type({
    connectionType,
    prefix: PrefixV,
    componentType: ComponentType
  })

export const AkkaConnectionV = connectionT(akka)
export const HttpConnectionV = connectionT(http)
export const TcpConnectionV = connectionT(tcp)

export type HttpConnection = t.TypeOf<typeof HttpConnectionV>
export type AkkaConnection = t.TypeOf<typeof AkkaConnectionV>
export type TcpConnection = t.TypeOf<typeof TcpConnectionV>

export const Connection = t.union([AkkaConnectionV, HttpConnectionV, TcpConnectionV])
export type Connection = t.TypeOf<typeof Connection>

export const HttpConnection = (prefix: Prefix, componentType: ComponentType): HttpConnection => {
  return { connectionType: 'http', prefix, componentType }
}

export const TcpConnection = (prefix: Prefix, componentType: ComponentType): TcpConnection => {
  return { connectionType: 'tcp', prefix, componentType }
}

export const AkkaConnection = (prefix: Prefix, componentType: ComponentType): AkkaConnection => {
  return { connectionType: 'akka', prefix, componentType }
}
