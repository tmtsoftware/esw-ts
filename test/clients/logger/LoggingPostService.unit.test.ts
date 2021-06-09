import { mocked } from 'ts-jest/utils'
import { Prefix } from '../../../src'
import type { GatewayLoggingPostRequest } from '../../../src/clients/gateway/models/Gateway'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { Log } from '../../../src/clients/logger/models/PostCommand'
import { DoneD } from '../../../src/decoders/CommonDecoders'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const mockResponse = 'Done'
const httpTransport: HttpTransport<GatewayLoggingPostRequest> = new HttpTransport('someUrl')
const mockHttpTransport = mocked(httpTransport)
const loggingServiceImpl = new LoggingServiceImpl(httpTransport)

describe('Logging Service', () => {
  test('should call log api with correct arguments without metadata | ESW-316', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await loggingServiceImpl.log(
      new Prefix('ESW', 'filter.wheel'),
      'DEBUG',
      'setting log level'
    )

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', {}),
      DoneD
    )
  })

  test('should call log api with correct arguments with metadata | ESW-316', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await loggingServiceImpl.log(
      new Prefix('ESW', 'filter.wheel'),
      'DEBUG',
      'setting log level',
      {
        key: 'value'
      }
    )

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', { key: 'value' }),
      DoneD
    )
  })
})

afterAll(() => jest.resetAllMocks())
