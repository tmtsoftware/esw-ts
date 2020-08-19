import { Done } from '../location'
import { Event } from './models/Event'
import { EventKey } from './models/EventKey'
import { Subscription } from '../../utils/Ws'
import { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { WebSocketTransport } from '../../utils/WebSocketTransport'
import { EventServiceImpl } from './EventServiceImpl'

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
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new EventServiceImpl(new HttpTransport(postEndpoint), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}
