import type { AppConfig, AppConfigModule } from '../models'
import { APP_CONFIG_PATH } from './AppConfigPath'

export const loadAppConfig = async (path: string = APP_CONFIG_PATH): Promise<AppConfig> => {
  const module = <AppConfigModule>await import(path)

  if (module.AppConfig && module.AppConfig.applicationName) {
    return module.AppConfig
  }

  throw new Error(`'applicationName' key not found inside 'AppConfig'`)
}
