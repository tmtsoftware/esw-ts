import * as t from 'io-ts'
import { AkkaConnectionV, HttpConnectionV, TcpConnectionV } from './Connection'

type LocationType = 'AkkaLocation' | 'HttpLocation' | 'TcpLocation'

const locationT = <L extends LocationType, T extends t.Mixed>(locationType: L, connection: T) =>
  t.type({
    _type: t.literal(locationType),
    connection: connection,
    uri: t.string
  })

const AkkaLocation = locationT('AkkaLocation', AkkaConnectionV)
const HttpLocation = locationT('HttpLocation', HttpConnectionV)
const TcpLocation = locationT('TcpLocation', TcpConnectionV)

export type AkkaLocation = t.TypeOf<typeof AkkaLocation>
export type HttpLocation = t.TypeOf<typeof HttpLocation>
export type TcpLocation = t.TypeOf<typeof TcpLocation>

export const Location = t.union([AkkaLocation, HttpLocation, TcpLocation])
export type Location = t.TypeOf<typeof Location>
