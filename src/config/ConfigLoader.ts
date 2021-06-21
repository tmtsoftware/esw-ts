import { AppConfig } from './AppConfigPath'
export const loadAppConfig = (): AppConfig => {
  if (!!AppConfig && AppConfig.applicationName != '') {
    return AppConfig
  }

  throw new Error(
    `'applicationName' is a mandatory field. use setAppConfig() method to configure Application name.'`
  )
}
