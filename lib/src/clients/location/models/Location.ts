import * as D from 'io-ts/lib/Decoder'
import { AkkaConnectionD, Connection, HttpConnectionD, TcpConnectionD } from './Connection'

const AkkaLocation = 'AkkaLocation'
const HttpLocation = 'HttpLocation'
const TcpLocation = 'TcpLocation'

type LocationType = typeof AkkaLocation | typeof HttpLocation | typeof TcpLocation

type LocationPayload<L extends LocationType, C extends Connection> = D.Decoder<{
  _type: L
  connection: C
  uri: string
}>

const locationD = <L extends LocationType, C extends Connection>(
  locationType: L,
  connection: D.Decoder<C>
): LocationPayload<L, C> =>
  D.type({
    _type: D.literal(locationType),
    connection: connection,
    uri: D.string
  })

const AkkaLocationD = locationD('AkkaLocation', AkkaConnectionD)
const HttpLocationD = locationD('HttpLocation', HttpConnectionD)
const TcpLocationD = locationD('TcpLocation', TcpConnectionD)

export type AkkaLocation = D.TypeOf<typeof AkkaLocation>
export type HttpLocation = D.TypeOf<typeof HttpLocation>
export type TcpLocation = D.TypeOf<typeof TcpLocation>

export const Location = D.sum('_type')({
  [AkkaLocation]: AkkaLocationD,
  [HttpLocation]: HttpLocationD,
  [TcpLocation]: TcpLocationD
})
export type Location = D.TypeOf<typeof Location>
