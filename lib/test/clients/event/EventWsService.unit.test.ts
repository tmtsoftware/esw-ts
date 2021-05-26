import { mocked } from 'ts-jest/utils'
import { EventKey, EventName } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { Subscribe, SubscribeWithPattern } from '../../../src/clients/event/models/WsCommand'
import type {
  GatewayEventPostRequest,
  GatewayEventWsRequest
} from '../../../src/clients/gateway/models/Gateway'
import { EventD } from '../../../src/decoders/EventDecoders'
import { Prefix, Subsystem } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const prefix = new Prefix('ESW', 'eventComp')
const eventName = new EventName('offline')
const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
const subsystem: Subsystem = 'ESW'
const callback = () => ({})
const onError = () => ({})

const httpTransport: HttpTransport<GatewayEventPostRequest> = new HttpTransport('someUrl')
const ws: Ws<GatewayEventWsRequest> = new Ws('someUrl')
const mockWs = mocked(ws)
const eventServiceImpl = new EventServiceImpl(httpTransport, () => ws)

describe('Event Service', () => {
  test('should subscribe event without default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.subscribe(eventKeys, 1)(callback, onError)

    verify(mockWs.subscribe).toBeCalledWith(
      new Subscribe([...eventKeys], 1),
      callback,
      EventD,
      onError
    )
  })

  test('should subscribe event with default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.subscribe(eventKeys)(callback, onError)

    verify(mockWs.subscribe).toBeCalledWith(
      new Subscribe([...eventKeys], 0),
      callback,
      EventD,
      onError
    )
  })

  test('should pattern subscribe event using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.pSubscribe(subsystem, 1, '.*')(callback, onError)

    verify(mockWs.subscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 1, '.*'),
      callback,
      EventD,
      onError
    )
  })

  test('should pattern subscribe event with default parameters using websocket | ESW-318, ESW-510', () => {
    eventServiceImpl.pSubscribe(subsystem)(callback, onError)

    verify(mockWs.subscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 0, '.*'),
      callback,
      EventD,
      onError
    )
  })
})
afterEach(() => jest.clearAllMocks())
