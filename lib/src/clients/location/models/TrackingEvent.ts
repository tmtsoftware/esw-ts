import type { Connection } from './Connection'
import type { Location } from './Location'

/**
 * This event represents modification in location details
 * @category Location Service
 */
export interface LocationUpdated {
  readonly _type: 'LocationUpdated'
  readonly location: Location
}

/**
 * This event represents unavailability of a location
 * @category Location Service
 */
export interface LocationRemoved {
  readonly _type: 'LocationRemoved'
  readonly connection: Connection
}

/**
 * TrackingEvent is used to represent location events while tracking the connection
 * @category Location Service
 */
export type TrackingEvent = LocationUpdated | LocationRemoved
