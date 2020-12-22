import { expect } from '@esm-bundle/chai'
import type { TokenFactory } from '../../../src'
import { AdminService } from '../../../src/clients/admin'
import { ConfigService } from '../../../src/clients/config-service'
import { ConfigServiceImpl } from '../../../src/clients/config-service/ConfigServiceImpl'
import { setAppConfigPath } from '../../../src/config'
import { ComponentId, Prefix } from '../../../src/models'
import { LocationServiceImpl } from '../../mocks/LocationServiceImpl'

const tokenFactory: TokenFactory = () => 'validToken'

const host = 'localhost'
const port = 5432
const configServiceImpl = new ConfigServiceImpl(host, port, tokenFactory)

describe('Config Service Factory', () => {
  it.skip('create config service | ESW-320', async () => {
    setAppConfigPath('/_dist2_/assets/appconfig/AppConfig.js')
    const configService = await ConfigService(tokenFactory)
    // eslint-disable-next-line jest/valid-expect
    expect(LocationServiceImpl.resolve.callCount).to.equal(1)
    // eslint-disable-next-line jest/valid-expect
    expect(configService).to.include(configServiceImpl)
  })

  // it('try running start services for integration test', async () => {
  //   await executeServerCommand('start-services', {
  //     services: ['Gateway']
  //   })
  // })

  it('integration test', async () => {
    const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
    const componentId = new ComponentId(trombonePrefix, 'HCD')
    const adminService = await AdminService()
    const response = await adminService.setLogLevel(componentId, 'DEBUG')

    // eslint-disable-next-line jest/valid-expect
    expect(response).to.equal('Done')
  })
})
