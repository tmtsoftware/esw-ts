import { DoneD } from '../../../src/clients/location'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { Log } from '../../../src/clients/logger/models/PostCommand'
import { Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const requestRes: jest.Mock = jest.fn()
const loggingServiceImpl = new LoggingServiceImpl(mockHttpTransport(requestRes))

describe('Logging Service', () => {
  test('should call log api with correct arguments without metadata | ESW-316', async () => {
    await loggingServiceImpl.log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level')

    expect(requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', {}),
      DoneD
    )
  })

  test('should call log api with correct arguments with metadata | ESW-316', async () => {
    await loggingServiceImpl.log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', {
      key: 'value'
    })

    expect(requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', { key: 'value' }),
      DoneD
    )
  })
})

afterAll(() => jest.resetAllMocks())
