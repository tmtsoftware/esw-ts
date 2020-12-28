import {expect} from '@esm-bundle/chai'
import {AdminService} from '../../../src/clients/admin'
import {setAppConfigPath} from '../../../src/config'
import {ComponentId, Prefix} from '../../../src/models'

describe('Sample Integration Test', () => {
  it('integration test', async () => {
    setAppConfigPath('/_dist2_/assets/appconfig/AppConfig.js')
    const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
    const componentId = new ComponentId(trombonePrefix, 'HCD')
    const adminService = await AdminService()
    const response = await adminService.setLogLevel(componentId, 'DEBUG')

    // eslint-disable-next-line jest/valid-expect
    expect(response).to.equal('Done')
  })
})
