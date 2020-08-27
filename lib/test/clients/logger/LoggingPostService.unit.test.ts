import { DoneD } from '../../../src/clients/location'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { Log } from '../../../src/clients/logger/models/PostCommand'
import { Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const loggingServiceImpl = new LoggingServiceImpl(mockHttpTransport(requestRes))

describe('Logging Service', () => {
  test('should call log api with correct arguments without metadata | ESW-316', async () => {
    const response = await loggingServiceImpl.log(
      new Prefix('ESW', 'filter.wheel'),
      'DEBUG',
      'setting log level'
    )

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', {}),
      DoneD
    )
  })

  test('should call log api with correct arguments with metadata | ESW-316', async () => {
    const response = await loggingServiceImpl.log(
      new Prefix('ESW', 'filter.wheel'),
      'DEBUG',
      'setting log level',
      {
        key: 'value'
      }
    )

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', { key: 'value' }),
      DoneD
    )
  })
})

afterAll(() => jest.resetAllMocks())
