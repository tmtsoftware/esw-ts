import * as D from 'io-ts/lib/Decoder'
import { ComponentType, Prefix, PrefixD } from '../../../models'
import { ciLiteral, Decoder } from '../../../utils/Decoder'

const akka = 'akka'
const http = 'http'
const tcp = 'tcp'

export type ConnectionType = typeof akka | typeof http | typeof tcp

type ConnectionDecoder<L extends ConnectionType> = Decoder<{
  connectionType: L
  prefix: Prefix
  componentType: ComponentType
}>

const connectionDecoder = <L extends ConnectionType>(connectionType: L): ConnectionDecoder<L> =>
  D.type({
    connectionType: ciLiteral(connectionType),
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
