import * as D from 'io-ts/lib/Decoder'
import { AkkaConnectionD, Connection, HttpConnectionD, TcpConnectionD } from './Connection'

const AkkaLocationL = 'AkkaLocation'
const HttpLocationL = 'HttpLocation'
const TcpLocationL = 'TcpLocation'

type LocationType = typeof AkkaLocationL | typeof HttpLocationL | typeof TcpLocationL

type LocationPayload<L extends LocationType, C extends Connection> = D.Decoder<
  unknown,
  {
    _type: L
    connection: C
    uri: string
  }
>

const locationD = <L extends LocationType, C extends Connection>(
  locationType: L,
  connection: D.Decoder<unknown, C>
): LocationPayload<L, C> =>
  D.type({
    _type: D.literal(locationType),
    connection: connection,
    uri: D.string
  })

const AkkaLocation = locationD('AkkaLocation', AkkaConnectionD)
const HttpLocation = locationD('HttpLocation', HttpConnectionD)
const TcpLocation = locationD('TcpLocation', TcpConnectionD)

export type AkkaLocation = D.TypeOf<typeof AkkaLocation>
export type HttpLocation = D.TypeOf<typeof HttpLocation>
export type TcpLocation = D.TypeOf<typeof TcpLocation>

export const Location = D.sum('_type')({
  [AkkaLocationL]: AkkaLocation,
  [HttpLocationL]: HttpLocation,
  [TcpLocationL]: TcpLocation
})
export type Location = D.TypeOf<typeof Location>
