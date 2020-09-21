import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Subscription, Ws } from '../../utils/Ws'
import type { Done } from '../location'
import { EventServiceImpl } from './EventServiceImpl'
import type { Event } from './models/Event'
import type { EventKey } from './models/EventKey'

export interface EventService {
  publish(event: Event): Promise<Done>

  get(eventKeys: Set<EventKey>): Promise<Event[]>

  subscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number
  ): (callback: (event: Event) => void) => Subscription

  pSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string
  ): (callback: (event: Event) => void) => Subscription
}

export const EventService = async (): Promise<EventService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new EventServiceImpl(new HttpTransport(postEndpoint), () => new Ws(webSocketEndpoint))
}
