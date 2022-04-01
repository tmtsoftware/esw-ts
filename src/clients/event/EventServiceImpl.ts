/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

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

  subscribe(eventKeys: Set<EventKey>, maxFrequency?: number) {
    return (
      onEvent: (event: Event) => void,
      onError?: (error: ServiceError) => void,
      onClose?: () => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndSubscribe(eventKeys, onEvent, onError, onClose, maxFrequency)
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  pSubscribe(subsystem: Subsystem, maxFrequency?: number, pattern = '.*') {
    return (
      onEvent: (event: Event) => void,
      onError?: (error: ServiceError) => void,
      onClose?: () => void
    ): Subscription => {
      const subscriptionResponse = this.resolveAndpSubscribe(
        subsystem,
        pattern,
        onEvent,
        onError,
        onClose,
        maxFrequency
      )
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  subscribeObserveEvents(maxFrequency?: number) {
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
    onEvent: (event: Event) => void,
    onError?: (error: ServiceError) => void,
    onClose?: () => void,
    maxFrequency?: number
  ) {
    return this.ws().subscribe(new Subscribe([...eventKeys], maxFrequency), onEvent, EventD, onError, onClose)
  }

  private async resolveAndpSubscribe(
    subsystem: Subsystem,
    pattern: string,
    onEvent: (event: Event) => void,
    onError?: (error: ServiceError) => void,
    onClose?: () => void,
    maxFrequency?: number
  ) {
    return this.ws().subscribe(
      new SubscribeWithPattern(subsystem, pattern, maxFrequency),
      onEvent,
      EventD,
      onError,
      onClose
    )
  }
}
