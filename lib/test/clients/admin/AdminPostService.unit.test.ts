import { mocked } from 'ts-jest/utils'
import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import { GetLogMetadata, SetLogLevel } from '../../../src/clients/admin/models/PostCommand'
import type { GatewayAdminPostRequest } from '../../../src/clients/gateway/models/Gateway'
import { DoneD } from '../../../src/clients/location/models/LocationResponses'
import type { LogMetadata } from '../../../src/clients/logger'
import { LogMetadataD } from '../../../src/clients/logger/models/LogMetadata'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/HttpTransport')

const httpTransport: HttpTransport<GatewayAdminPostRequest> = new HttpTransport('')
const mockedHttpTransport = mocked(httpTransport)
const adminServiceImpl = new AdminServiceImpl(httpTransport)

describe('Admin Service', () => {
  test('should call getLogMetadata api with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')
    const expectedLogMetadata: LogMetadata = {
      akkaLevel: 'DEBUG',
      componentLevel: 'TRACE',
      defaultLevel: 'INFO',
      slf4jLevel: 'WARN'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedLogMetadata)

    const response: LogMetadata = await adminServiceImpl.getLogMetadata(componentId)

    expect(response).toEqual(expectedLogMetadata)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GetLogMetadata(componentId),
      LogMetadataD
    )
  })

  test('should call log setLogLevel with correct arguments | ESW-372', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')
    const level = 'WARN'

    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.setLogLevel(componentId, level)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SetLogLevel(componentId, level),
      DoneD
    )
    expect(response).toEqual('Done')
  })
})

afterAll(() => jest.resetAllMocks())
