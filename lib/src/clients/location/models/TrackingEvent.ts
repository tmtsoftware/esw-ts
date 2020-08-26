import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../../utils/Decoder'
import { Connection, ConnectionD } from './Connection'
import { Location, LocationD } from './Location'

// ##################### Decoders #####################
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
// ######################################################

export interface LocationUpdated {
  readonly _type: 'LocationUpdated'
  readonly location: Location
}

export interface LocationRemoved {
  readonly _type: 'LocationRemoved'
  readonly connection: Connection
}

export type TrackingEvent = LocationUpdated | LocationRemoved
