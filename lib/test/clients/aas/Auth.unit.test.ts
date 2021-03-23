import Keycloak from 'keycloak-js'
import { mocked } from 'ts-jest/utils'
import { AuthStore } from '../../../src/clients/aas'
import { HttpConnection, HttpLocation } from '../../../src/clients/location'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { AASConfig } from '../../../src/config'
import { Prefix } from '../../../src/models'
import { mockedKeyCloakInstance } from '../../helpers/MockHelpers'

const conf = {
  realm: 'TMT',
  clientId: 'config-app'
}

const url = 'http://localhost:8081'

jest.mock('../../../src/clients/location/LocationUtils')
jest.mock('keycloak-js')

afterEach(() => jest.clearAllMocks())

describe('Auth', () => {
  test('should create AuthStore instance | ESW-330, ESW-476', () => {
    const mockKeycloak = mockedKeyCloakInstance(false)
    const auth = AuthStore.from(mockKeycloak)

    expect(auth.logout).toBe(mockKeycloak.logout)
    expect(auth.token()).toBe(mockKeycloak.token)
    expect(auth.tokenParsed()).toBe(mockKeycloak.tokenParsed)
    expect(auth.tokenParsed()?.preferred_username).toBe('esw-user')
    expect(auth.realmAccess()).toBe(mockKeycloak.realmAccess)
    expect(auth.resourceAccess()).toBe(mockKeycloak.resourceAccess)
    expect(auth.loadUserProfile).toBe(mockKeycloak.loadUserProfile)
    expect(auth.isAuthenticated()).toBe(false)
    expect(auth.hasRealmRole).toBe(mockKeycloak.hasRealmRole)
    expect(auth.hasResourceRole).toBe(mockKeycloak.hasResourceRole)
  })

  test('Initialise keycloak on authenticate | ESW-330', async () => {
    const mockFn = mocked(Keycloak, true)
    const keycloakInstance = mockedKeyCloakInstance()
    mockFn.mockReturnValue(keycloakInstance)

    const { authenticatedPromise } = await AuthStore.authenticate(conf, url, true)

    const expectedConfig = {
      ...AASConfig,
      ...conf,
      url
    }

    expect(keycloakInstance.init).toBeCalledWith({
      onLoad: 'login-required',
      flow: 'standard'
    })
    expect(mockFn).toBeCalledWith(expectedConfig)
    expect(await authenticatedPromise).toEqual(true)
  })

  test('Initialise keycloak on authenticate with redirect false | ESW-330', async () => {
    const mockFn = mocked(Keycloak, true)
    const keycloakInstance = mockedKeyCloakInstance()
    mockFn.mockReturnValue(keycloakInstance)

    await AuthStore.authenticate(conf, url, false)

    expect(keycloakInstance.init).toBeCalledWith({
      onLoad: 'check-sso',
      flow: 'standard'
    })
  })

  test('fetch AAS url | ESW-330', async () => {
    const mockedResolve = mocked(resolve, true)
    const authLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: HttpConnection(new Prefix('CSW', 'AAS'), 'Service'),
      uri: 'http://localhost:8081/auth',
      metadata: {}
    }
    mockedResolve.mockResolvedValueOnce(authLocation)
    // mockedResolve.mockRejectedValueOnce(Error('aas not found'))
    const uri = await AuthStore.getAASUrl()
    expect(uri).toEqual('http://localhost:8081/auth')
  })

  test('fail to fetch AAS url | ESW-330', async () => {
    const mockedResolve = mocked(resolve, true)
    mockedResolve.mockRejectedValueOnce(Error('CSW.AAS not found'))

    await expect(() => AuthStore.getAASUrl()).rejects.toThrow('CSW.AAS not found')
  })
})
