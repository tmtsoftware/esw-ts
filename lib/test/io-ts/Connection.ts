import * as t from 'io-ts'
import { ComponentType } from './ComponentType'
import { PrefixIO } from './PrefixIO'

const akka = t.literal('akka')
const http = t.literal('http')
const tcp = t.literal('tcp')

export const ConnectionType = t.union([akka, http, tcp])
export type ConnectionType = t.TypeOf<typeof ConnectionType>

export const AkkaConnection = t.type({
  connectionType: akka,
  prefix: PrefixIO,
  componentType: ComponentType
})
export type AkkaConnection = t.TypeOf<typeof AkkaConnection>

export const HttpConnection = t.type({
  connectionType: http,
  prefix: PrefixIO,
  componentType: ComponentType
})
export type HttpConnection = t.TypeOf<typeof HttpConnection>

export const TcpConnection = t.type({
  connectionType: tcp,
  prefix: PrefixIO,
  componentType: ComponentType
})
export type TcpConnection = t.TypeOf<typeof TcpConnection>

export const Connection = t.union([AkkaConnection, HttpConnection, TcpConnection])
export type Connection = t.TypeOf<typeof Connection>
