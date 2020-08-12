import * as D from 'io-ts/lib/Decoder'
import { Done } from '../location'
import { Event } from './models/Event'
import { EventKey } from './models/EventKey'
import { Subscription, Ws } from '../../utils/Ws'
import { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { GatewayEventPostRequest, GatewayEventWsRequest } from '../gateway/models/Gateway'
import { resolveGateway } from '../gateway/ResolveGateway'
import { Subscribe, SubscribeWithPattern } from './models/WsCommand'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { WebSocketTransport } from '../../utils/WebSocketTransport'
import { GetEvent, PublishEvent } from './models/PostCommand'

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

export class EventServiceImpl implements EventService {
  constructor(
    private readonly httpTransport: HttpTransport<GatewayEventPostRequest>,
    private readonly ws: () => Ws<GatewayEventWsRequest>
  ) {}

  publish(event: Event): Promise<Done> {
    return this.httpTransport.requestRes(new PublishEvent(event), Done)
  }

  get(eventKeys: Set<EventKey>): Promise<Event[]> {
    return this.httpTransport.requestRes(new GetEvent([...eventKeys]), D.array(Event))
  }

  subscribe(eventKeys: Set<EventKey>, maxFrequency = 0) {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = this.resolveAndSubscribe(eventKeys, maxFrequency, callback)
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  pSubscribe(subsystem: Subsystem, maxFrequency = 0, pattern = '.*') {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = this.resolveAndpSubscribe(
        subsystem,
        maxFrequency,
        pattern,
        callback
      )
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  private async resolveAndSubscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number,
    callback: (event: Event) => void
  ) {
    return this.ws().subscribe(new Subscribe([...eventKeys], maxFrequency), callback, Event)
  }

  private async resolveAndpSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string,
    callback: (event: Event) => void
  ) {
    return this.ws().subscribe(
      new SubscribeWithPattern(subsystem, maxFrequency, pattern),
      callback,
      Event
    )
  }
}
