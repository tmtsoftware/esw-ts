import * as D from 'io-ts/lib/Decoder'
import type {
  AkkaConnection,
  AkkaLocation,
  Connection,
  ConnectionType,
  HttpConnection,
  HttpLocation,
  Location,
  LocationRemoved,
  LocationUpdated,
  TcpConnection,
  TcpLocation,
  TrackingEvent
} from '../clients/location'
import type { ComponentType, Prefix } from '../models'
import { ComponentTypeD } from './ComponentTypeDecoder'
import { ciLiteral, Decoder, sum } from './Decoder'
import { PrefixD } from './PrefixDecoder'

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

export const ConnectionTypeD: Decoder<ConnectionType> = D.literal('akka', 'http', 'tcp')

export const AkkaConnectionD: Decoder<AkkaConnection> = mkConnectionD('akka')
export const HttpConnectionD: Decoder<HttpConnection> = mkConnectionD('http')
export const TcpConnectionD: Decoder<TcpConnection> = mkConnectionD('tcp')

export const ConnectionD: Decoder<Connection> = sum('connectionType')({
  akka: AkkaConnectionD,
  http: HttpConnectionD,
  tcp: TcpConnectionD
})

type LocationType = 'AkkaLocation' | 'HttpLocation' | 'TcpLocation'

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

export const AkkaLocationD: Decoder<AkkaLocation> = mkLocationD('AkkaLocation', AkkaConnectionD)
export const HttpLocationD: Decoder<HttpLocation> = mkLocationD('HttpLocation', HttpConnectionD)
export const TcpLocationD: Decoder<TcpLocation> = mkLocationD('TcpLocation', TcpConnectionD)

export const LocationD: Decoder<Location> = sum('_type')({
  AkkaLocation: AkkaLocationD,
  HttpLocation: HttpLocationD,
  TcpLocation: TcpLocationD
})

export const LocationListD: Decoder<Location[]> = D.array(LocationD)

const LocationUpdatedD: Decoder<LocationUpdated> = D.type({
  _type: D.literal('LocationUpdated'),
  location: LocationD
})

const LocationRemovedD: Decoder<LocationRemoved> = D.type({
  _type: D.literal('LocationRemoved'),
  connection: ConnectionD
})

export const TrackingEventD: Decoder<TrackingEvent> = sum('_type')({
  LocationUpdated: LocationUpdatedD,
  LocationRemoved: LocationRemovedD
})
