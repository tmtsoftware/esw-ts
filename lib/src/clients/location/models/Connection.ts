import * as D from 'io-ts/lib/Decoder'
import { ComponentType, Prefix, PrefixD } from '../../../models'

const akka = 'akka'
const http = 'http'
const tcp = 'tcp'

export type ConnectionType = typeof akka | typeof http | typeof tcp

type ConnectionPayload<T extends ConnectionType> = D.Decoder<{
  connectionType: T
  prefix: Prefix
  componentType: ComponentType
}>

const connectionT = <T extends ConnectionType>(connectionType: T): ConnectionPayload<T> =>
  D.type({
    connectionType: D.literal(connectionType),
    prefix: PrefixD,
    componentType: ComponentType
  })

export const AkkaConnectionD = connectionT(akka)
export const HttpConnectionD = connectionT(http)
export const TcpConnectionD = connectionT(tcp)

export type HttpConnection = D.TypeOf<typeof HttpConnectionD>
export type AkkaConnection = D.TypeOf<typeof AkkaConnectionD>
export type TcpConnection = D.TypeOf<typeof TcpConnectionD>

export const Connection = D.sum('connectionType')({
  [akka]: AkkaConnectionD,
  [http]: HttpConnectionD,
  [tcp]: TcpConnectionD
})

export type Connection = D.TypeOf<typeof Connection>

const makeConnection = <T extends ConnectionType>(connectionType: T) => (
  prefix: Prefix,
  componentType: ComponentType
) => ({ connectionType, prefix, componentType })

export const AkkaConnection = makeConnection(akka)
export const HttpConnection = makeConnection(http)
export const TcpConnection = makeConnection(tcp)
