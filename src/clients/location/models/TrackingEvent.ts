import { Connection } from 'clients/location/models/Connection'
import { Location } from 'clients/location/models/Location'

export interface LocationUpdated {
  readonly _type: 'LocationUpdated'
  readonly location: Location
}

export interface LocationRemoved {
  readonly _type: 'LocationRemoved'
  readonly connection: Connection
}

export type TrackingEvent = LocationUpdated | LocationRemoved
