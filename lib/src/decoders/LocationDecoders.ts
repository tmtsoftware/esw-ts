import * as D from 'io-ts/lib/Decoder'
import type { LocationRemoved, LocationUpdated, TrackingEvent } from '../clients/location'
import type { ConnectionType, Connection } from '../clients/location/models/Connection'

import { ComponentType, ComponentTypeD } from '../models/ComponentType'
import type { Prefix } from '../models/params/Prefix'
import { ciLiteral, Decoder } from '../utils/Decoder'

import { PrefixD } from './PrefixDecoder'

const akkaL = 'akka'
const httpL = 'http'
const tcpL = 'tcp'

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

export const ConnectionTypeD = D.literal(akkaL, httpL, tcpL)

export const AkkaConnectionD = mkConnectionD(akkaL)
export const HttpConnectionD = mkConnectionD(httpL)
export const TcpConnectionD = mkConnectionD(tcpL)

export const ConnectionD = D.sum('connectionType')({
  [akkaL]: AkkaConnectionD,
  [httpL]: HttpConnectionD,
  [tcpL]: TcpConnectionD
})

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

export const LocationListD = D.array(LocationD)

const LocationUpdatedD: Decoder<LocationUpdated> = D.type({
  _type: D.literal('LocationUpdated'),
  location: LocationD
})

const LocationRemovedD: Decoder<LocationRemoved> = D.type({
  _type: D.literal('LocationRemoved'),
  connection: ConnectionD
})

export const TrackingEventD: Decoder<TrackingEvent> = D.sum('_type')({
  LocationUpdated: LocationUpdatedD,
  LocationRemoved: LocationRemovedD
})
