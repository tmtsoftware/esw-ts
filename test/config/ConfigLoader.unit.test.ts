import { setAppConfigPath } from '../../src/config'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import { loadAppConfig } from '../../src/config/ConfigLoader'

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

afterEach(() => setAppConfigPath(OLD_APP_CONFIG_PATH))

describe('Config Loader', () => {
  test('should be able to decode application name from config | ESW-312', async () => {
    const expected = { applicationName: 'test-app' }
    setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')

    const config = await loadAppConfig()
    expect(config).toEqual(expected)
  })

  test('should return unknown when application name does not exist | ESW-312', async () => {
    setAppConfigPath('../../test/assets/appconfig/ConfigWithoutApplicationNameKey.ts')
    expect.assertions(1)
    await loadAppConfig().catch((e) => {
      expect(e.message).toBe("'applicationName' key not found inside 'AppConfig'")
    })
  })

  test('should return unknown when AppConfig does not exist | ESW-312', async () => {
    setAppConfigPath('../../test/assets/appconfig/EmptyAppConfig.ts')
    expect.assertions(1)
    await loadAppConfig().catch((e) => {
      expect(e.message).toBe("'applicationName' key not found inside 'AppConfig'")
    })
  })

  test('should return unknown when module does not exist | ESW-312', async () => {
    expect.assertions(1)
    await loadAppConfig().catch((e) => {
      expect(e.message).toBe(
        "Cannot find module '/_dist_/config/AppConfig.js' from 'src/config/ConfigLoader.ts'"
      )
    })
  })
})
