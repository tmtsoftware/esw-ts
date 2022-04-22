/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventKey, EventName } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { Subscribe, SubscribeObserveEvents, SubscribeWithPattern } from '../../../src/clients/event/models/WsCommand'
import type { GatewayEventPostRequest, GatewayEventWsRequest } from '../../../src/clients/gateway/models/Gateway'
import { EventD } from '../../../src/decoders/EventDecoders'
import { Prefix, Subsystem } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { noop, verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const prefix = new Prefix('ESW', 'eventComp')
const eventName = new EventName('offline')
const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
const subsystem: Subsystem = 'ESW'
const callback = noop
const onError = noop
const onClose = noop

const httpTransport: HttpTransport<GatewayEventPostRequest> = new HttpTransport('someUrl')
const ws: Ws<GatewayEventWsRequest> = new Ws('someUrl')
const mockWs = jest.mocked(ws)
const eventServiceImpl = new EventServiceImpl(httpTransport, () => ws)

describe('Event Service', () => {
  test('should subscribe event without default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.subscribe(eventKeys, 1)(callback, onError, onClose)

    verify(mockWs.subscribe).toBeCalledWith(new Subscribe([...eventKeys], 1), callback, EventD, onError, onClose)
  })

  test('should subscribe event with default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.subscribe(eventKeys)(callback)

    verify(mockWs.subscribe).toBeCalledWith(new Subscribe([...eventKeys]), callback, EventD, undefined, undefined)
  })

  test('should pattern subscribe event using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.pSubscribe(subsystem, 1, '.*')(callback, onError, onClose)

    verify(mockWs.subscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, '.*', 1),
      callback,
      EventD,
      onError,
      onClose
    )
  })

  test('should pattern subscribe event with default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.pSubscribe(subsystem)(callback)

    verify(mockWs.subscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, '.*'),
      callback,
      EventD,
      undefined,
      undefined
    )
  })
  test('should subscribe observe events using websocket | ESW-582', () => {
    eventServiceImpl.subscribeObserveEvents()(callback)

    verify(mockWs.subscribe).toBeCalledWith(new SubscribeObserveEvents(), callback, EventD, undefined, undefined)
  })
})
afterEach(() => jest.clearAllMocks())
