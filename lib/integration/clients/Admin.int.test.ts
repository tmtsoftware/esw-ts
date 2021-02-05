import 'whatwg-fetch'
import { AdminService } from '../../src/clients/admin'
import type { LogMetadata } from '../../src/clients/logger'
import { setAppConfigPath } from '../../src/config'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import {
  ComponentId,
  ContainerLifecycleState,
  Done,
  Prefix,
  SupervisorLifecycleState
} from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

jest.setTimeout(30000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  await startServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

describe('Admin Client', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  const componentId = new ComponentId(trombonePrefix, 'HCD')
  test('set setLogLevel | ESW-372', async () => {
    const adminService = await AdminService()

    const response = await adminService.setLogLevel(componentId, 'DEBUG')

    expect(response).toEqual('Done')
  })

  test('set getLogMetadata | ESW-372', async () => {
    const adminService = await AdminService()

    const response: LogMetadata = await adminService.getLogMetadata(componentId)

    expect(response.akkaLevel).toEqual('DEBUG')
    expect(response.componentLevel).toEqual('ERROR')
    expect(response.defaultLevel).toEqual('INFO')
    expect(response.slf4jLevel).toEqual('INFO')
  })

  test('restart | ESW-433', async () => {
    const adminService = await AdminService()

    const response: Done = await adminService.restart(componentId)

    expect(response).toEqual('Done')
  })

  test('shutdown | ESW-433', async () => {
    const adminService = await AdminService()

    const response: Done = await adminService.shutdown(componentId)

    expect(response).toEqual('Done')
  })

  test('goOffline | ESW-433', async () => {
    const adminService = await AdminService()

    const response: Done = await adminService.goOffline(componentId)

    expect(response).toEqual('Done')
  })

  test('goOnline | ESW-433', async () => {
    const adminService = await AdminService()

    const response: Done = await adminService.goOnline(componentId)

    expect(response).toEqual('Done')
  })

  test('get containerLifecycleState | ESW-433', async () => {
    const adminService = await AdminService()
    const prefix: Prefix = Prefix.fromString('ESW.test_container')

    const response: ContainerLifecycleState = await adminService.getContainerLifecycleState(prefix)

    expect(response).toEqual('Idle')
  })

  test('get getComponentLifecycleState | ESW-433', async () => {
    const adminService = await AdminService()

    const response: SupervisorLifecycleState = await adminService.getComponentLifecycleState(
      componentId
    )

    expect(response).toEqual('Idle')
  })
})
