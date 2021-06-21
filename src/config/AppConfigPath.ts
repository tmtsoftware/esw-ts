export const AppConfig: AppConfig = {
  realm: 'TMT',
  clientId: 'tmt-frontend-app',
  applicationName: ''
}

export type AppConfig = {
  realm?: string
  clientId?: string
  applicationName: string
}

export const setAppConfig = (config: AppConfig) => {
  AppConfig.applicationName = config.applicationName ?? ''
  AppConfig.clientId = config.clientId ?? AppConfig.clientId
  AppConfig.realm = config.realm ?? AppConfig.realm
}
