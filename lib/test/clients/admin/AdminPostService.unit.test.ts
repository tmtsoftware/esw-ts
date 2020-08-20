import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import { ComponentId, Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'
import { LogMetadataD } from '../../../src/clients/logger'
import { voidDecoder } from '../../../src/utils/Decoder'
import { GetLogMetadata, SetLogLevel } from '../../../src/clients/admin/models/PostCommand'

const requestRes: jest.Mock = jest.fn()
const adminServiceImpl = new AdminServiceImpl(mockHttpTransport(requestRes))

describe('Admin Service', () => {
  test('should call getLogMetadata api with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')
    await adminServiceImpl.getLogMetadata(componentId)
    expect(requestRes).toBeCalledWith(new GetLogMetadata(componentId), LogMetadataD)
  })

  test('should call log setLogLevel with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')
    const level = 'WARN'
    await adminServiceImpl.setLogLevel(componentId, level)
    expect(requestRes).toBeCalledWith(new SetLogLevel(componentId, level), voidDecoder)
  })
})

afterAll(() => jest.resetAllMocks())
