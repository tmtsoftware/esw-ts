import { mocked } from 'ts-jest/utils'
import { GATEWAY_CONNECTION } from '../../../src'
import { EventService } from '../../../src/clients/event/EventService'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/event/EventServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveGateway = mocked(resolve)
const mockImpl = mocked(EventServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})
const eventServiceImpl = new EventServiceImpl(
  new HttpTransport(postEndpoint),
  () => new Ws(wsEndpoint)
)
mockImpl.mockReturnValue(eventServiceImpl)

describe('Event Service Factory', () => {
  test('should create event service | ESW-318', async () => {
    const a = await EventService()

    expect(a).toEqual(eventServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
  })
})

afterAll(() => {
  jest.resetAllMocks()
})
