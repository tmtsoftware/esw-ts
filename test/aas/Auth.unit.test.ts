import { TMTAuth } from 'aas/Auth'
import { mocked } from 'ts-jest/utils'
import * as Keycloak from 'keycloak-js'
import { AASConfig } from 'config/AASConfig'
import { KeycloakInstance } from 'keycloak-js'
import { mockedKeyCloakInstance } from 'aas/MockHelper'
//
jest.mock('keycloak-js')
const postMockFn = mocked(Keycloak, true)

describe('Auth', () => {
  test('Initialise auth handler', async () => {
    const mockInitHandler = jest.fn()
    postMockFn.mockReturnValue(mockedKeyCloakInstance(mockInitHandler))
    const conf = {
      realm: 'TMT-test',
      clientId: 'config-app'
    }
    const url = 'http://localhost:8081'

    await TMTAuth.authenticate(conf, url)

    const expectedConfig = {
      ...AASConfig,
      ...conf,
      url
    }
    expect(mockInitHandler).toBeCalledWith({
      onLoad: 'login-required',
      flow: 'implicit'
    })
    expect(postMockFn).toBeCalledWith(expectedConfig)
  })
})
