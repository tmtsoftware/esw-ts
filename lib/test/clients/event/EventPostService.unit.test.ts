import { mocked } from 'ts-jest/utils'
import { EventKey, EventName, ObserveEvent, SystemEvent } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { GetEvent, PublishEvent } from '../../../src/clients/event/models/PostCommand'
import type {
  GatewayEventPostRequest,
  GatewayEventWsRequest
} from '../../../src/clients/gateway/models/Gateway'
import { DoneD } from '../../../src/decoders/CommonDecoders'
import { Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const mockResponse = 'Done'

const httpTransport: HttpTransport<GatewayEventPostRequest> = new HttpTransport('someUrl')
const mockHttpTransport = mocked(httpTransport)

const ws: Ws<GatewayEventWsRequest> = new Ws('someUrl')
const client = new EventServiceImpl(httpTransport, () => ws)

describe('Event Service', () => {
  test('should publish system event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const systemEvent = SystemEvent.make(prefix, eventName, [])

    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await client.publish(systemEvent)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(new PublishEvent(systemEvent), DoneD)
  })

  test('should publish observe event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = ObserveEvent.make(prefix, eventName, [])

    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await client.publish(observeEvent)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(new PublishEvent(observeEvent), DoneD)
  })

  test('should get event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
    const mockSubmitResponse = { _type: 'Started', runId: '123' }

    mockHttpTransport.requestRes.mockResolvedValueOnce(mockSubmitResponse)

    const response = await client.get(eventKeys)

    expect(response).toEqual(mockSubmitResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new GetEvent([...eventKeys]),
      expect.anything()
    )
  })
})

afterEach(() => jest.clearAllMocks())
