import 'whatwg-fetch'
import { ComponentId, Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { AdminService } from '../../src/clients/admin'
import { LogMetadata } from '../../src/clients/logger'

jest.setTimeout(30000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Admin Client ', () => {
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
})
