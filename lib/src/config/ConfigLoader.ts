import { dynamicImport } from '../utils/DynamicLoader'
import { AppConfig, AppConfigModule } from './ApplicationConfig'

export const load = async (): Promise<AppConfig> => {
  const path = '/_dist_/config/AppConfig.js'

  const module = <AppConfigModule>await dynamicImport(path).catch(() => {
    throw new Error(`App Config not found at '${path}'`)
  })

  if (module.AppConfig && module.AppConfig.applicationName) {
    return module.AppConfig
  }

  throw new Error(`'applicationName' key not found inside 'AppConfig'`)
}
