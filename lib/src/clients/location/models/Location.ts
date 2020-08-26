import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { AkkaConnectionD, Connection, HttpConnectionD, TcpConnectionD } from './Connection'

// ##################### Decoders #####################
const AkkaLocationL = 'AkkaLocation'
const HttpLocationL = 'HttpLocation'
const TcpLocationL = 'TcpLocation'

type LocationType = typeof AkkaLocationL | typeof HttpLocationL | typeof TcpLocationL

type LocationDecoder<L extends LocationType, C extends Connection> = Decoder<{
  _type: L
  connection: C
  uri: string
  metadata: Record<string, string>
}>

const mkLocationD = <L extends LocationType, C extends Connection>(
  locationType: L,
  connection: Decoder<C>
): LocationDecoder<L, C> =>
  D.type({
    _type: ciLiteral(locationType),
    connection: connection,
    uri: D.string,
    metadata: D.record(D.string)
  })

export const AkkaLocationD = mkLocationD(AkkaLocationL, AkkaConnectionD)
export const HttpLocationD = mkLocationD(HttpLocationL, HttpConnectionD)
export const TcpLocationD = mkLocationD(TcpLocationL, TcpConnectionD)

export const LocationD = D.sum('_type')({
  [AkkaLocationL]: AkkaLocationD,
  [HttpLocationL]: HttpLocationD,
  [TcpLocationL]: TcpLocationD
})

// ######################################################

export type AkkaLocation = D.TypeOf<typeof AkkaLocationD>
export type HttpLocation = D.TypeOf<typeof HttpLocationD>
export type TcpLocation = D.TypeOf<typeof TcpLocationD>
export type Location = D.TypeOf<typeof LocationD>
