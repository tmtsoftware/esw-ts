import { TMTAuth } from '../../src/aas/Auth'
import { mocked } from 'ts-jest/utils'
import Keycloak from 'keycloak-js'
import { AASConfig } from '../../src/config'
import { resolve } from '../../src/clients/location/LocationUtils'
import { HttpConnection, HttpLocation } from '../../src/clients/location'
import { Prefix } from '../../src/models'
import { mockedKeyCloakInstance } from '../utils/MockHelpers'

const conf = {
  realm: 'TMT-test',
  clientId: 'config-app'
}

const url = 'http://localhost:8081'

jest.mock('../../src/clients/location/LocationUtils')
jest.mock('keycloak-js')

afterEach(() => jest.clearAllMocks())

describe('Auth', () => {
  test('Initialise keycloak on authenticate', async () => {
    const mockFn = mocked(Keycloak, true)
    const keycloakInstance = mockedKeyCloakInstance()
    mockFn.mockReturnValue(keycloakInstance)

    const { authenticatedPromise } = await TMTAuth.authenticate(conf, url, true)

    const expectedConfig = {
      ...AASConfig,
      ...conf,
      url
    }

    expect(keycloakInstance.init).toBeCalledWith({
      onLoad: 'login-required',
      flow: 'implicit'
    })
    expect(mockFn).toBeCalledWith(expectedConfig)
    expect(await authenticatedPromise).toEqual(true)
  })

  test('fetch AAS url', async () => {
    const mockedResolve = mocked(resolve, true)
    const authLocation = new HttpLocation(
      new HttpConnection(new Prefix('CSW', 'AAS'), 'Service'),
      'http://localhost:8081/auth'
    )
    mockedResolve.mockResolvedValueOnce(authLocation)
    // mockedResolve.mockRejectedValueOnce(Error('aas not found'))
    const uri = await TMTAuth.getAASUrl()
    expect(uri).toEqual('http://localhost:8081/auth')
  })

  test('fail to fetch AAS url', async () => {
    const mockedResolve = mocked(resolve, true)
    mockedResolve.mockRejectedValueOnce(Error('CSW.AAS not found'))

    await expect(() => TMTAuth.getAASUrl()).rejects.toThrow('CSW.AAS not found')
  })
})
