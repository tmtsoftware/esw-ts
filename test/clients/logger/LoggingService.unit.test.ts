import { mocked } from 'ts-jest/utils'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { LoggingService } from '../../../src/clients/logger'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { GATEWAY_CONNECTION } from '../../../src/config/Connections'
import { HttpTransport } from '../../../src/utils/HttpTransport'

jest.mock('../../../src/clients/logger/LoggingServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveGateway = mocked(resolve)
const mockImpl = mocked(LoggingServiceImpl)

const postEndpoint = 'postEndpoint'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})

const loggingServiceImpl = new LoggingServiceImpl(new HttpTransport(postEndpoint))

describe('Logging Service Factory', () => {
  test('create logging service | ESW-316', async () => {
    mockImpl.mockReturnValue(loggingServiceImpl)
    const actualLoggingService = await LoggingService()

    expect(actualLoggingService).toEqual(loggingServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
