import { setAppConfig } from '../../src/config'
import { AppConfig } from '../../src/config/AppConfigPath'
import { loadAppConfig } from '../../src/config/ConfigLoader'

const OLD_APP_CONFIG_PATH = AppConfig

afterEach(() => setAppConfig(OLD_APP_CONFIG_PATH))

describe('Config Loader', () => {
  test('should be able to decode application name from config | ESW-312', async () => {
    const expected = { applicationName: 'test-app', clientId: 'tmt-frontend-app', realm: 'TMT' }
    setAppConfig({ applicationName: 'test-app' })

    const config = loadAppConfig()
    expect(config).toEqual(expected)
  })

  test('should return unknown when application name does not exist | ESW-312', async () => {
    setAppConfig({ applicationName: '' })
    expect.assertions(1)

    expect(() => loadAppConfig()).toThrow(
      "'applicationName' is a mandatory field. use setAppConfig() method to configure Application name.'"
    )
  })
})
