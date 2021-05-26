import type { Subscription } from '../..'
import { DoneD } from '../../decoders/CommonDecoders'
import { EventD, EventsD } from '../../decoders/EventDecoders'
import type { Done, ServiceError, Subsystem } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { Ws } from '../../utils/Ws'
import type { GatewayEventPostRequest, GatewayEventWsRequest } from '../gateway/models/Gateway'
import type { EventService } from './EventService'
import type { Event } from './models/Event'
import type { EventKey } from './models/EventKey'
import { GetEvent, PublishEvent } from './models/PostCommand'
import { Subscribe, SubscribeWithPattern } from './models/WsCommand'

export class EventServiceImpl implements EventService {
  constructor(
    private readonly httpTransport: HttpTransport<GatewayEventPostRequest>,
    private readonly ws: () => Ws<GatewayEventWsRequest>
  ) {}

  publish(event: Event): Promise<Done> {
    return this.httpTransport.requestRes(new PublishEvent(event), DoneD)
  }

  get(eventKeys: Set<EventKey>): Promise<Event[]> {
    return this.httpTransport.requestRes(new GetEvent([...eventKeys]), EventsD)
  }

  subscribe(eventKeys: Set<EventKey>, maxFrequency = 0) {
    return (
      callback: (event: Event) => void,
      onError?: (error: ServiceError) => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndSubscribe(
        eventKeys,
        maxFrequency,
        callback,
        onError
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
    return (
      callback: (event: Event) => void,
      onError?: (error: ServiceError) => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndpSubscribe(
        subsystem,
        maxFrequency,
        pattern,
        callback,
        onError
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
    callback: (event: Event) => void,
    onError?: (error: ServiceError) => void
  ) {
    return this.ws().subscribe(
      new Subscribe([...eventKeys], maxFrequency),
      callback,
      EventD,
      onError
    )
  }

  private async resolveAndpSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string,
    callback: (event: Event) => void,
    onError?: (error: ServiceError) => void
  ) {
    return this.ws().subscribe(
      new SubscribeWithPattern(subsystem, maxFrequency, pattern),
      callback,
      EventD,
      onError
    )
  }
}
