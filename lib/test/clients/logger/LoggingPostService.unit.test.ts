import { Done } from '../../../src/clients/location'
import { LoggingServiceImpl } from '../../../src/clients/logger/LoggingServiceImpl'
import { Log } from '../../../src/clients/logger/models/PostCommand'
import { Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const requestRes: jest.Mock = jest.fn()
const loggingServiceImpl = new LoggingServiceImpl(mockHttpTransport(requestRes))

describe('Logging Service', () => {
  test('should call log api with correct arguments | ESW-316', async () => {
    await loggingServiceImpl.log(
      new Prefix('ESW', 'filter.wheel'),
      'DEBUG',
      'setting log level',
      {}
    )

    expect(requestRes).toBeCalledWith(
      new Log(new Prefix('ESW', 'filter.wheel'), 'DEBUG', 'setting log level', {}),
      Done
    )
  })
})

afterAll(() => jest.resetAllMocks())
