import type { Connection } from './Connection'
import type { Location } from './Location'
/**
 * @category Location Service
 */
export interface LocationUpdated {
  readonly _type: 'LocationUpdated'
  readonly location: Location
}
/**
 * @category Location Service
 */
export interface LocationRemoved {
  readonly _type: 'LocationRemoved'
  readonly connection: Connection
}
/**
 * @category Location Service
 */
export type TrackingEvent = LocationUpdated | LocationRemoved
