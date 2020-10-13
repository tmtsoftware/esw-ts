import type { Subscription } from '../..'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import type { Done } from '../location'
import { EventServiceImpl } from './EventServiceImpl'
import type { Event } from './models/Event'
import type { EventKey } from './models/EventKey'

/**
 * A Event Service API provides client side methods to interact with the event server.
 * @interface
 */
export interface EventService {
  /**
   * Publishes an event
   *
   * @param event the event to be published
   * @return Done as Promise
   */
  publish(event: Event): Promise<Done>

  /**
   * Gets the list of event for the given set of event keys
   *
   * @param eventKeys Set of event keys against which event are fetched.
   * @return Event[] as Promise
   */
  get(eventKeys: Set<EventKey>): Promise<Event[]>

  /**
   * Subscribes to given set of event keys
   *
   * @param eventKeys Set of event keys to be subscribed.
   * @param maxFrequency the duration which determines the frequency with which events are received
   * @param callback the function which gets triggered on receiving an event
   * @return Subscription
   */
  subscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number
  ): (callback: (event: Event) => void) => Subscription

  /**
   * Subscribes to given subsystem and optional pattern string.
   *
   * @param subsystem subscription to be made under the subsystem
   * @param maxFrequency the duration which determines the frequency with which events are received
   * @param pattern optional pattern to match against the event key.supported glob-style patterns
   *
   *                  - h?llo subscribes to hello, hallo and hxllo
   *                  - h*llo subscribes to hllo and heeeello
   *                  - h[ae]llo subscribes to hello and hallo, but not hillo
   *
   * @param callback the function which gets triggered on receiving an event
   * @return Subscription
   */
  pSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string
  ): (callback: (event: Event) => void) => Subscription
}

/**
 * Instantiate Event service to enable interaction with the event server.
 *
 * @constructor
 */
export const EventService = async (): Promise<EventService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new EventServiceImpl(new HttpTransport(postEndpoint), () => new Ws(webSocketEndpoint))
}
