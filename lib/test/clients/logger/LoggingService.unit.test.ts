import { mocked } from 'ts-jest/utils'
import { resolveGateway } from '../../../src/clients/gateway/ResolveGateway'
import { LoggingService } from '../../../src/clients/logger'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint } from '../../../src/utils/Utils'

jest.mock('../../../src/clients/logger/LoggingServiceImpl')
jest.mock('../../../src/clients/gateway/ResolveGateway')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveGateway = mocked(resolveGateway)
const mockImpl = mocked(LoggingServiceImpl)

const postEndpoint = 'postEndpoint'
const uri = { host: '123', port: 1234 }
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)

const loggingServiceImpl = new LoggingServiceImpl(new HttpTransport(postEndpoint))

describe('Logging Service Factory', () => {
  test('create logging service | ESW-316', async () => {
    mockImpl.mockReturnValue(loggingServiceImpl)
    const actualLoggingService = await LoggingService()

    expect(actualLoggingService).toEqual(loggingServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
