import { dynamicImport } from '../utils/DynamicLoader'
import { AppConfig, AppConfigModule } from './ApplicationConfig'

export const load = async (): Promise<AppConfig> => {
  const path = '/_dist_/config/AppConfig.js'

  const module = <AppConfigModule>await dynamicImport(path).catch(() => {
    return { AppConfig: { applicationName: 'unknown' } }
  })

  if (module.AppConfig && module.AppConfig.applicationName) {
    return module.AppConfig
  }

  return { applicationName: 'unknown' }
}

// approach 1
// load().then((x) => (APP_CONFIG = x))

// approach 2
// document this thing like taking a app name at load time.
// const init = async (appname: string) => {
//    load().then((x) => (APP_CONFIG = x))
// }
