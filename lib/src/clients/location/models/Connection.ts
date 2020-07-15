import * as D from 'io-ts/lib/Decoder'
import { ComponentType, Prefix, PrefixD } from '../../../models'

const akka = 'akka'
const http = 'http'
const tcp = 'tcp'

export type ConnectionType = typeof akka | typeof http | typeof tcp

type ConnectionDecoder<T extends ConnectionType> = D.Decoder<
  unknown,
  {
    connectionType: T
    prefix: Prefix
    componentType: ComponentType
  }
>

const connectionDecoder = <T extends ConnectionType>(connectionType: T): ConnectionDecoder<T> =>
  D.type({
    connectionType: D.literal(connectionType),
    prefix: PrefixD,
    componentType: ComponentType
  })

export const AkkaConnectionD = connectionDecoder(akka)
export const HttpConnectionD = connectionDecoder(http)
export const TcpConnectionD = connectionDecoder(tcp)

export type AkkaConnection = D.TypeOf<typeof AkkaConnectionD>
export type HttpConnection = D.TypeOf<typeof HttpConnectionD>
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
