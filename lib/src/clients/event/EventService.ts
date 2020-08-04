import * as D from 'io-ts/lib/Decoder'
import { Done } from '../location'
import { Event } from './models/Event'
import { EventKey } from './models/EventKey'
import { Subscription, Ws } from '../../utils/Ws'
import { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import {
  GatewayEventPostRequest,
  GatewayGetEvent,
  GatewayPublishEvent
} from '../gateway/models/Gateway'
import { resolveGateway } from '../gateway/ResolveGateway'
import { EventWebsocketRequest, Subscribe, SubscribeWithPattern } from './models/WebSocketMessages'

interface EventServiceApi {
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

export class EventService implements EventServiceApi {
  private readonly httpTransport: HttpTransport<GatewayEventPostRequest>

  constructor() {
    this.httpTransport = new HttpTransport(resolveGateway)
  }

  publish(event: Event): Promise<Done> {
    return this.httpTransport.requestRes(new GatewayPublishEvent(event), Done)
  }

  get(eventKeys: Set<EventKey>): Promise<Event[]> {
    return this.httpTransport.requestRes(new GatewayGetEvent([...eventKeys]), D.array(Event))
  }

  subscribe(eventKeys: Set<EventKey>, maxFrequency = 0) {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = EventService.resolveAndSubscribe(
        eventKeys,
        maxFrequency,
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

  pSubscribe(subsystem: Subsystem, maxFrequency = 0, pattern = '.*') {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = EventService.resolveAndpSubscribe(
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

  private static async ws(): Promise<Ws<EventWebsocketRequest>> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port)
  }

  private static async resolveAndSubscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number,
    callback: (event: Event) => void
  ) {
    return (await EventService.ws()).subscribe(
      new Subscribe([...eventKeys], maxFrequency),
      callback,
      Event
    )
  }

  private static async resolveAndpSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string,
    callback: (event: Event) => void
  ) {
    return (await EventService.ws()).subscribe(
      new SubscribeWithPattern(subsystem, maxFrequency, pattern),
      callback,
      Event
    )
  }
}
