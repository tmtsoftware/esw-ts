import * as D from 'io-ts/lib/Decoder'
import { Decoder, ciLiteral } from '../../../utils/Decoder'
import { AkkaConnectionD, Connection, HttpConnectionD, TcpConnectionD } from './Connection'

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

const location = <L extends LocationType, C extends Connection>(
  locationType: L,
  connection: Decoder<C>
): LocationDecoder<L, C> =>
  D.type({
    _type: ciLiteral(locationType),
    connection: connection,
    uri: D.string,
    metadata: D.record(D.string)
  })

export const AkkaLocation = location(AkkaLocationL, AkkaConnectionD)
export const HttpLocation = location(HttpLocationL, HttpConnectionD)
export const TcpLocation = location(TcpLocationL, TcpConnectionD)

export type AkkaLocation = D.TypeOf<typeof AkkaLocation>
export type HttpLocation = D.TypeOf<typeof HttpLocation>
export type TcpLocation = D.TypeOf<typeof TcpLocation>

export const Location = D.sum('_type')({
  [AkkaLocationL]: AkkaLocation,
  [HttpLocationL]: HttpLocation,
  [TcpLocationL]: TcpLocation
})
export type Location = D.TypeOf<typeof Location>
