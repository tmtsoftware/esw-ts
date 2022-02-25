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
import { Subscribe, SubscribeObserveEvents, SubscribeWithPattern } from './models/WsCommand'

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
      onEvent: (event: Event) => void,
      onError?: (error: ServiceError) => void,
      onClose?: () => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndSubscribe(eventKeys, maxFrequency, onEvent, onError, onClose)
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
      onEvent: (event: Event) => void,
      onError?: (error: ServiceError) => void,
      onClose?: () => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndpSubscribe(
        subsystem,
        maxFrequency,
        pattern,
        onEvent,
        onError,
        onClose
      )
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  subscribeObserveEvents(maxFrequency = 0) {
    return (
      onEvent: (event: Event) => void,
      onError?: (error: ServiceError) => void,
      onClose?: () => void
    ): Subscription => {
      return this.ws().subscribe(new SubscribeObserveEvents(maxFrequency), onEvent, EventD, onError, onClose)
    }
  }

  private async resolveAndSubscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number,
    onEvent: (event: Event) => void,
    onError?: (error: ServiceError) => void,
    onClose?: () => void
  ) {
    return this.ws().subscribe(new Subscribe([...eventKeys], maxFrequency), onEvent, EventD, onError, onClose)
  }

  private async resolveAndpSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string,
    onEvent: (event: Event) => void,
    onError?: (error: ServiceError) => void,
    onClose?: () => void
  ) {
    return this.ws().subscribe(
      new SubscribeWithPattern(subsystem, maxFrequency, pattern),
      onEvent,
      EventD,
      onError,
      onClose
    )
  }
}
