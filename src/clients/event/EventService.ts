/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventServiceImpl } from './EventServiceImpl'
import type { AuthData, Subscription } from '../..'
import type { Event } from './models/Event'
import type { EventKey } from './models/EventKey'
import { GATEWAY_CONNECTION } from '../../config/Connections'
import type { Done, ServiceError, Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import type { Location } from '../location'
import { resolve } from '../location/LocationUtils'

/**
 * A Event Service API provides client side methods to interact with the event server.
 * @interface
 * @category Service
 */
export interface EventService {
  /**
   * Publishes an event
   *
   * @param event       the event to be published
   * @return            Done as Promise
   */
  publish(event: Event): Promise<Done>

  /**
   * Gets the list of event for the given set of event keys
   *
   * @param eventKeys   Set of event keys against which event are fetched.
   * @return            Event[] as Promise
   */
  get(eventKeys: Set<EventKey>): Promise<Event[]>

  /**
   * This API subscribes to multiple `eventKeys` and receive events at `every` frequency
   * and return subscription handle which can be used as a kill switch.
   * It takes callback function which gets triggered when ever the events are received.
   * The latest events available for the given Event Keys will be received first.
   *
   * @param eventKeys     Set of event keys to be subscribed.
   * @param maxFrequency  the frequency with which events are to be received (in Hz)
   * @param onEvent       the function which gets triggered on receiving an event
   * @param onError       a optional error callback which gets called on receiving error.
   *                      it can be Parsing error or a Runtime error [for ex. Gateway exception]
   * @param onClose       a optional close callback which gets called when the connection is closed.
   * @return Subscription
   */
  subscribe(
    eventKeys: Set<EventKey>,
    maxFrequency?: number
  ): (onEvent: (event: Event) => void, onError?: (error: ServiceError) => void, onClose?: () => void) => Subscription

  /**
   * This API subscribes to events of all the EventKeys specified using a `Subsystem`
   * and a `pattern` to match the remaining Event Key and return subscription handle
   * which can be used as a kill switch.
   * It takes callback function which gets triggered when ever the events are received.
   * The latest events available for the given Event Keys will be received first.
   *
   * @param subsystem       subscription to be made under the subsystem
   * @param maxFrequency    the frequency with which events are to be received (in Hz)
   * @param pattern         optional pattern to match against the event key.supported glob-style patterns
   *
   *                        - h?llo subscribes to hello, hallo and hxllo
   *                        - h*llo subscribes to hllo and heeeello
   *                        - h[ae]llo subscribes to hello and hallo, but not hillo
   *
   * @param onEvent        the function which gets triggered on receiving an event
   * @param onError         a optional error callback which gets called on receiving error.
   *                        it can be Parsing error or a Runtime error [for ex. Gateway exception]
   * @param onClose         a optional close callback which gets called when the connection is closed.
   * @return                Subscription
   */
  pSubscribe(
    subsystem: Subsystem,
    maxFrequency?: number,
    pattern?: string
  ): (onEvent: (event: Event) => void, onError?: (error: ServiceError) => void, onClose?: () => void) => Subscription

  /**
   * This API subscribes to all observe events
   * It takes callback function which gets triggered when ever the events are received.
   * The latest events available for the given Event Keys will be received first.
   *
   * @param maxFrequency    the frequency with which events are to be received (in Hz)
   *
   * @param onEvent         the function which gets triggered on receiving an Observe Event
   * @param onError         a optional error callback which gets called on receiving error.
   *                        it can be Parsing error or a Runtime error [for ex. Gateway exception]
   * @param onClose         a optional close callback which gets called when the connection is closed.
   * @return                Subscription
   */
  subscribeObserveEvents(
    maxFrequency?: number
  ): (onEvent: (event: Event) => void, onError?: (error: ServiceError) => void, onClose?: () => void) => Subscription
}

/**
 * Instantiate Event service to enable interaction with the event server.
 *
 * @constructor
 */
export const EventService = async (authData?: AuthData): Promise<EventService> => {
  const location = await resolve(GATEWAY_CONNECTION)
  return createEventService(location, authData)
}

export const createEventService = (location: Location, authData?: AuthData): EventService => {
  const { host, port } = extractHostPort(location.uri)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new EventServiceImpl(
    new HttpTransport(postEndpoint, authData),
    () => new Ws(webSocketEndpoint, authData?.username)
  )
}
