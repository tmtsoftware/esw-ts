import 'whatwg-fetch'
import { AdminService } from '../../src/clients/admin'
import type { LogMetadata } from '../../src/clients/logger'
import { setAppName } from '../../src/config'
import { ComponentId, ContainerLifecycleState, Done, Prefix, SupervisorLifecycleState } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

let adminServiceWithToken: AdminService
let adminServiceWithInvalidToken: AdminService
let adminServiceWithoutToken: AdminService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  setAppName('test-app')
  await startServices(['AAS', 'Gateway'])
  adminServiceWithToken = await AdminService({ tokenFactory: () => 'validToken' })
  adminServiceWithInvalidToken = await AdminService({ tokenFactory: () => 'invalidToken' })
  adminServiceWithoutToken = await AdminService()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Admin Client', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  const componentId = new ComponentId(trombonePrefix, 'HCD')
  test('set setLogLevel | ESW-372', async () => {
    const response = await adminServiceWithToken.setLogLevel(componentId, 'DEBUG')

    expect(response).toEqual('Done')
  })

  test('set getLogMetadata | ESW-372', async () => {
    const response: LogMetadata = await adminServiceWithToken.getLogMetadata(componentId)

    expect(response.pekkoLevel).toEqual('DEBUG')
    expect(response.componentLevel).toEqual('ERROR')
    expect(response.defaultLevel).toEqual('INFO')
    expect(response.slf4jLevel).toEqual('INFO')
  })

  test('restart | ESW-433', async () => {
    const response: Done = await adminServiceWithToken.restart(componentId)

    expect(response).toEqual('Done')
  })

  test('shutdown | ESW-433', async () => {
    const response: Done = await adminServiceWithToken.shutdown(componentId)

    expect(response).toEqual('Done')
  })

  test('goOffline | ESW-433', async () => {
    const response: Done = await adminServiceWithToken.goOffline(componentId)

    expect(response).toEqual('Done')
  })

  test('goOnline | ESW-433', async () => {
    const response: Done = await adminServiceWithToken.goOnline(componentId)

    expect(response).toEqual('Done')
  })

  test('get containerLifecycleState | ESW-433', async () => {
    const prefix: Prefix = Prefix.fromString('ESW.test_container')

    const response: ContainerLifecycleState = await adminServiceWithToken.getContainerLifecycleState(prefix)

    expect(response).toEqual('Idle')
  })

  test('get getComponentLifecycleState | ESW-433', async () => {
    const response: SupervisorLifecycleState = await adminServiceWithToken.getComponentLifecycleState(componentId)

    expect(response).toEqual('Idle')
  })

  test('should get unauthorized error when no token is provided | ESW-538', async () => {
    expect.assertions(4)
    await adminServiceWithoutToken.goOffline(componentId).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.statusText).toBe('Unauthorized')
      expect(e.message).toBe('The resource requires authentication, which was not supplied with the request')
    })
  })

  test('should get unauthorized error when invalid token is provided | ESW-538', async () => {
    expect.assertions(4)
    await adminServiceWithInvalidToken.goOffline(componentId).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.statusText).toBe('Unauthorized')
      expect(e.message).toBe('The supplied authentication is invalid')
    })
  })
})
