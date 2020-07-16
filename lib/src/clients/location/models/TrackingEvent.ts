import * as D from 'io-ts/lib/Decoder'
import { Connection } from './Connection'
import { Location } from './Location'
import { Decoder } from '../../../utils/Decoder'

const LocationUpdated: Decoder<LocationUpdated> = D.type({
  _type: D.literal('LocationUpdated'),
  location: Location
})

export interface LocationUpdated {
  readonly _type: 'LocationUpdated'
  readonly location: Location
}

const LocationRemoved: Decoder<LocationRemoved> = D.type({
  _type: D.literal('LocationRemoved'),
  connection: Connection
})

export interface LocationRemoved {
  readonly _type: 'LocationRemoved'
  readonly connection: Connection
}

export const TrackingEvent: Decoder<TrackingEvent> = D.sum('_type')({
  LocationUpdated,
  LocationRemoved
})

export type TrackingEvent = LocationUpdated | LocationRemoved
