import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import { GetLogMetadata, SetLogLevel } from '../../../src/clients/admin/models/PostCommand'
import { DoneD } from '../../../src/clients/location'
import { LogMetadata, LogMetadataD } from '../../../src/clients/logger'
import { ComponentId, Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(mockResponse)
const adminServiceImpl = new AdminServiceImpl(mockHttpTransport(requestRes))

describe('Admin Service', () => {
  test('should call getLogMetadata api with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')

    const response: LogMetadata = await adminServiceImpl.getLogMetadata(componentId)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GetLogMetadata(componentId), LogMetadataD)
  })

  test('should call log setLogLevel with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')
    const level = 'WARN'

    const response = await adminServiceImpl.setLogLevel(componentId, level)
    expect(requestRes).toBeCalledWith(new SetLogLevel(componentId, level), DoneD)
    expect(response).toEqual(mockResponse)
  })
})

afterAll(() => jest.resetAllMocks())
