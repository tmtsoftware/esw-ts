import {expect} from '@esm-bundle/chai'
import type {TokenFactory} from '../../../src'
import {ConfigService} from '../../../src/clients/config-service'
import {ConfigServiceImpl} from '../../../src/clients/config-service/ConfigServiceImpl'
import {setAppConfigPath} from '../../../src/config'
import {LocationServiceImpl} from '../../mocks/LocationServiceImpl'

const tokenFactory: TokenFactory = () => 'validToken'

const host = 'localhost'
const port = 5432
const configServiceImpl = new ConfigServiceImpl(host, port, tokenFactory)

describe('Sample Unit Test', () => {
  it('create config service | ESW-320', async () => {
    setAppConfigPath('/_dist2_/assets/appconfig/AppConfig.js')
    const configService = await ConfigService(tokenFactory)
    // eslint-disable-next-line jest/valid-expect
    expect(LocationServiceImpl.resolve.callCount).to.equal(1)
    // eslint-disable-next-line jest/valid-expect
    expect(configService).to.include(configServiceImpl)
  })
})
