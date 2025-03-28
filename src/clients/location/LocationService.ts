/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocationServiceImpl } from './LocationServiceImpl'
import type { AuthData, Option, Subscription } from '../..'
import type { Connection, ConnectionType } from './models/Connection'
import type { TimeUnit } from './models/Duration'
import type { Location } from './models/Location'
import type { TrackingEvent } from './models/TrackingEvent'
import { GlobalConfig, LocationInfo } from '../../config/GlobalConfig'
import type { ComponentType, Done, Prefix, ServiceError } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'

/**
 *  A Location Service Client API. This model provides promise based APIs for managing service registrations.
 *  @interface
 *  @category Service
 */
export interface LocationService {
  /**
   * List the registered components in location service.
   *
   * @return                    Location[] as Promise
   */
  list(): Promise<Location[]>

  /**
   * List the registered components based on this component type.
   *
   * @param componentType       list components of this componentType
   * @return                    Location[] as Promise
   */
  listByComponentType(componentType: ComponentType): Promise<Location[]>

  /**
   * List the registered components based on the hostname. Hostname can be IP or URL.
   *
   * @param hostname            list components of this hostname
   * @return                    Location[] as Promise
   */
  listByHostname(hostname: string): Promise<Location[]>

  /**
   * List the registered components based on the connection type.
   *
   * @param connectionType      list components of this connection type
   * @return                    Location[] as Promise
   */
  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>

  /**
   * List the registered components based on the prefix.
   *
   * @param prefix               list components of this prefix
   * @return                     Location[] as Promise
   */
  listByPrefix(prefix: Prefix): Promise<Location[]>

  /**
   * Find a location for the given Connection.
   *
   * @param connection          The connection to be located
   * @return                    Location as Promise if available
   */
  find(connection: Connection): Promise<Option<Location>>

  /**
   * A secured API which unregisters a connection from the location service.
   *
   * @param connection          The connection to be unregistered
   * @return                    Done as Promise
   */
  unregister(connection: Connection): Promise<Done>

  /**
   * Resolves the location for a connection, if not found waits for the event to arrive within specified time limit.
   * Returns undefined if both failed.
   *
   * @param connection          The Connection to be located
   * @param within              Time within which the connection to be resolved
   * @param unit                TimeUnit Ex: millis, seconds, hours, etc.
   * @return                    Location as Promise if available
   */
  resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>>

  /**
   * Tracks the connection and send events for modification or removal of its location.
   *
   * @param connection          The Connection to be tracked
   * @param onEvent             A function which gets triggered whenever a tracking event is received
   * @param onError             a optional error callback which gets called on receiving error.
   *                            it can be Parsing error or a Runtime error [for ex. Gateway exception]
   * @param onClose             a optional close callback which gets called when the connection is closed.
   * @return                    Subscription which provides a handle to cancel the subscription
   */
  track(
    connection: Connection
  ): (
    onEvent: (trackingEvent: TrackingEvent) => void,
    onError?: (error: ServiceError) => void,
    onClose?: () => void
  ) => Subscription
}

/**
 * (DO NOT USE IN PRODUCTION)
 * this constructor is used in testing & will get deleted eventually.
 * @constructor
 */
export const LocationServiceInternal = (authData?: AuthData, locationConfig?: LocationInfo): LocationService => {
  const config: LocationInfo = locationConfig ? locationConfig : extractHostPort(GlobalConfig.locationUrl)

  return makeLocationService(config, authData)
}

/**
 * Instantiates the location service.
 *
 * @param tokenFactory          a function that returns a valid token which has correct access roles and permissions
 * @constructor
 */
export const LocationService = (authData?: AuthData): LocationService => {
  const config: LocationInfo = extractHostPort(GlobalConfig.locationUrl)

  return makeLocationService(config, authData)
}

const makeLocationService = (config: LocationInfo, authData?: AuthData) => {
  const webSocketEndpoint = getWebSocketEndPoint({
    host: config.host,
    port: config.port
  })
  const postEndpoint = getPostEndPoint({
    host: config.host,
    port: config.port
  })
  return new LocationServiceImpl(
    new HttpTransport(postEndpoint, authData),
    () => new Ws(webSocketEndpoint, authData?.username)
  )
}
