import { mocked } from 'ts-jest/utils'
import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import {
  GetComponentLifecycleState,
  GetContainerLifecycleState,
  GetLogMetadata,
  GoOffline,
  GoOnline,
  Restart,
  SetLogLevel,
  Shutdown
} from '../../../src/clients/admin/models/PostCommand'
import type { GatewayAdminPostRequest } from '../../../src/clients/gateway/models/Gateway'
import type { LogMetadata } from '../../../src/clients/logger'
import {
  ContainerLifecycleStateD,
  SupervisorLifecycleStateD
} from '../../../src/decoders/AdminDecoders'
import { DoneD } from '../../../src/decoders/CommonDecoders'
import { LogMetadataD } from '../../../src/decoders/LoggerDecoders'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/HttpTransport')

const httpTransport: HttpTransport<GatewayAdminPostRequest> = new HttpTransport('')
const mockedHttpTransport = mocked(httpTransport)
const adminServiceImpl = new AdminServiceImpl(httpTransport)
const componentId = new ComponentId(new Prefix('ESW', 'filter'), 'HCD')

describe('Admin Service', () => {
  test('should call getLogMetadata api with correct arguments | ESW-372', async () => {
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
    const level = 'WARN'

    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.setLogLevel(componentId, level)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SetLogLevel(componentId, level),
      DoneD
    )
    expect(response).toEqual('Done')
  })

  test('should call log restart with correct arguments | ESW-433', async () => {
    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.restart(componentId)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(new Restart(componentId), DoneD)
    expect(response).toEqual('Done')
  })

  test('should call log shutdown with correct arguments | ESW-433', async () => {
    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.shutdown(componentId)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(new Shutdown(componentId), DoneD)
    expect(response).toEqual('Done')
  })

  test('should call log goOffline with correct arguments | ESW-433', async () => {
    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.goOffline(componentId)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(new GoOffline(componentId), DoneD)
    expect(response).toEqual('Done')
  })

  test('should call log goOnline with correct arguments | ESW-433', async () => {
    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')

    const response = await adminServiceImpl.goOnline(componentId)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(new GoOnline(componentId), DoneD)
    expect(response).toEqual('Done')
  })

  test('should call log getContainerLifecycleState with correct arguments | ESW-433', async () => {
    const prefix = new Prefix('ESW', 'filter')

    mockedHttpTransport.requestRes.mockResolvedValueOnce('Idle')

    const response = await adminServiceImpl.getContainerLifecycleState(prefix)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GetContainerLifecycleState(prefix),
      ContainerLifecycleStateD
    )
    expect(response).toEqual('Idle')
  })

  test('should call log getSupervisorLifecycleState with correct arguments | ESW-433', async () => {
    mockedHttpTransport.requestRes.mockResolvedValueOnce('Idle')

    const response = await adminServiceImpl.getComponentLifecycleState(componentId)

    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GetComponentLifecycleState(componentId),
      SupervisorLifecycleStateD
    )
    expect(response).toEqual('Idle')
  })
})

afterAll(() => jest.resetAllMocks())
