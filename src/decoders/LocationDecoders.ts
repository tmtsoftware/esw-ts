/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as D from 'io-ts/lib/Decoder'
import { ComponentTypeD } from './ComponentTypeDecoder'
import { ciLiteral, Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'
import type {
  PekkoConnection,
  PekkoLocation,
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

type ConnectionDecoder<L extends ConnectionType> = Decoder<{
  connectionType: L
  prefix: Prefix
  componentType: ComponentType
}>

const mkConnectionD = <L extends ConnectionType>(connectionType: L): ConnectionDecoder<L> =>
  D.struct({
    connectionType: ciLiteral(connectionType),
    prefix: PrefixD,
    componentType: ComponentTypeD
  })

export const ConnectionTypeD: Decoder<ConnectionType> = D.literal('pekko', 'http', 'tcp')

export const PekkoConnectionD: Decoder<PekkoConnection> = mkConnectionD('pekko')
export const HttpConnectionD: Decoder<HttpConnection> = mkConnectionD('http')
export const TcpConnectionD: Decoder<TcpConnection> = mkConnectionD('tcp')

export const ConnectionD: Decoder<Connection> = D.sum('connectionType')({
  pekko: PekkoConnectionD,
  http: HttpConnectionD,
  tcp: TcpConnectionD
})

type LocationType = 'PekkoLocation' | 'HttpLocation' | 'TcpLocation'

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
  D.struct({
    _type: ciLiteral(locationType),
    connection: connection,
    uri: D.string,
    metadata: D.record(D.string)
  })

export const PekkoLocationD: Decoder<PekkoLocation> = mkLocationD('PekkoLocation', PekkoConnectionD)
export const HttpLocationD: Decoder<HttpLocation> = mkLocationD('HttpLocation', HttpConnectionD)
export const TcpLocationD: Decoder<TcpLocation> = mkLocationD('TcpLocation', TcpConnectionD)

export const LocationD: Decoder<Location> = D.sum('_type')({
  PekkoLocation: PekkoLocationD,
  HttpLocation: HttpLocationD,
  TcpLocation: TcpLocationD
})

export const LocationListD: Decoder<Location[]> = D.array(LocationD)

const LocationUpdatedD: Decoder<LocationUpdated> = D.struct({
  _type: D.literal('LocationUpdated'),
  location: LocationD
})

const LocationRemovedD: Decoder<LocationRemoved> = D.struct({
  _type: D.literal('LocationRemoved'),
  connection: ConnectionD
})

export const TrackingEventD: Decoder<TrackingEvent> = D.sum('_type')({
  LocationUpdated: LocationUpdatedD,
  LocationRemoved: LocationRemovedD
})
