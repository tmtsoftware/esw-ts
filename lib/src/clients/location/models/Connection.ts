import * as D from 'io-ts/lib/Decoder'
import { PrefixD } from '../../../decoders/PrefixDecoder'
import type { ComponentType, Prefix } from '../../../models'
import { ComponentTypeD } from '../../../models/ComponentType'
import { ciLiteral, Decoder } from '../../../utils/Decoder'

// ##################### Decoders #####################
const akkaL = 'akka'
const httpL = 'http'
const tcpL = 'tcp'

export const ConnectionTypeD = D.literal(akkaL, httpL, tcpL)

type ConnectionDecoder<L extends ConnectionType> = Decoder<{
  connectionType: L
  prefix: Prefix
  componentType: ComponentType
}>

const mkConnectionD = <L extends ConnectionType>(connectionType: L): ConnectionDecoder<L> =>
  D.type({
    connectionType: ciLiteral(connectionType),
    prefix: PrefixD,
    componentType: ComponentTypeD
  })

export const AkkaConnectionD = mkConnectionD(akkaL)
export const HttpConnectionD = mkConnectionD(httpL)
export const TcpConnectionD = mkConnectionD(tcpL)

export const ConnectionD = D.sum('connectionType')({
  [akkaL]: AkkaConnectionD,
  [httpL]: HttpConnectionD,
  [tcpL]: TcpConnectionD
})

// ######################################################

export type ConnectionType = D.TypeOf<typeof ConnectionTypeD>
export type AkkaConnection = D.TypeOf<typeof AkkaConnectionD>
export type HttpConnection = D.TypeOf<typeof HttpConnectionD>
export type TcpConnection = D.TypeOf<typeof TcpConnectionD>

export type Connection = D.TypeOf<typeof ConnectionD>

// ##################### factories #####################
const mkConnection = <T extends ConnectionType>(connectionType: T) => (
  prefix: Prefix,
  componentType: ComponentType
) => ({ connectionType, prefix, componentType })

export const AkkaConnection = mkConnection(akkaL)
export const HttpConnection = mkConnection(httpL)
export const TcpConnection = mkConnection(tcpL)
