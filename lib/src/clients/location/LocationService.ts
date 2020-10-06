import type { TokenFactory, Option, Subscription } from '../..'
import { LocationConfig } from '../../config'
import type { ComponentType, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import { LocationServiceImpl } from './LocationServiceImpl'
import type { Connection, ConnectionType } from './models/Connection'
import type { TimeUnit } from './models/Duration'
import type { Location } from './models/Location'
import type { Done } from './models/LocationResponses'
import type { TrackingEvent } from './models/TrackingEvent'

/**
 *  A Location Service Client API. This model provides promise based APIs for managing service registrations.
 *  @interface
 */
export interface LocationService {
  /**
   * List the registered components in location service
   *
   * @return Location[] as Promise
   */
  list(): Promise<Location[]>
  /**
   * List the registered components based on this component type
   *
   * @param componentType list components of this componentType
   * @return Location[] as Promise
   */
  listByComponentType(componentType: ComponentType): Promise<Location[]>
  /**
   * List the registered components based on the hostname
   *
   * @param hostname list components of this hostname
   * @return Location[] as Promise
   */
  listByHostname(hostname: string): Promise<Location[]>
  /**
   * List the registered components based on the connection type
   *
   * @param connectionType list components of this connection type
   * @return Location[] as Promise
   */
  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>
  /**
   * List the registered components based on the prefix
   *
   * @param prefix list components of this prefix
   * @return Location[] as Promise
   */
  listByPrefix(prefix: Prefix): Promise<Location[]>
  /**
   * Find a location for the given Connection
   *
   * @param connection to be located
   * @return Option<Location> as Promise
   */
  find(connection: Connection): Promise<Option<Location>>
  /**
   * A secured api which unregisters a connection from the location service
   *
   * @param connection to be unregistered.
   * @return Done as Promise
   */
  unregister(connection: Connection): Promise<Done>
  /**
   * Resolves the location for a connection, if not found waits for the event to arrive within specified time limit.
   * Returns undefined if both failed
   *
   * @param connection to be located.
   * @param within time within which the connection to be resolved
   * @param unit TimeUnit
   * @return Option<Location> as Promise
   */
  resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>>
  /**
   * Tracks the connection and send events for modification or removal of its location
   *
   * @param connection to be tracked
   * @param callback which gets triggered whenever an tracking event is received
   * @return Subscription which provides handle to cancel the subscription
   */
  track(connection: Connection): (callBack: (trackingEvent: TrackingEvent) => void) => Subscription
}

/**
 * Instantiate location service
 *
 * @param tokenFactory a function that returns a valid token which has correct access roles and permissions
 * @param locationConfig host and port of location server
 * @constructor
 */
export const LocationService = (
  tokenFactory: TokenFactory = () => undefined,
  locationConfig = LocationConfig
) => {
  const webSocketEndpoint = getWebSocketEndPoint({
    host: locationConfig.hostName,
    port: locationConfig.port
  })
  const postEndpoint = getPostEndPoint({
    host: locationConfig.hostName,
    port: locationConfig.port
  })
  return new LocationServiceImpl(
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
