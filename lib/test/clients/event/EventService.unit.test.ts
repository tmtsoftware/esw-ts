import { mocked } from 'ts-jest/utils'
import { EventService } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { resolveGateway } from '../../../src/clients/gateway/ResolveGateway'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { WebSocketTransport } from '../../../src/utils/WebSocketTransport'
jest.mock('../../../src/clients/event/EventServiceImpl')
jest.mock('../../../src/clients/gateway/ResolveGateway')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockResolveGateway = mocked(resolveGateway)
const mockImpl = mocked(EventServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const uri = { host: '123', port: 1234 }
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)
wsMockEndpoint.mockReturnValue(wsEndpoint)
const eventServiceImpl = new EventServiceImpl(new HttpTransport(postEndpoint), () =>
  WebSocketTransport(wsEndpoint)
)
mockImpl.mockReturnValue(eventServiceImpl)

describe('Event Service Factory', () => {
  test('should create event service | ESW-318', async () => {
    const a = await EventService()

    expect(a).toEqual(eventServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
    expect(wsMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => {
  jest.resetAllMocks()
})
