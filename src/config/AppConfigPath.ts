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
/**
 * A Configuration utility for applications. This method must be called at the root of your application.
 * Ideally all application built inside TMT org must have different names. this is the utility method
 * which is used to give application their unique name.
 *
 * @param AppConfig         configuration object.
 *             applicationName : a required field.
 *             realm: optional field which is used to create keycloak instance. default value : `TMT`
 *             clientId: optional field which is used to create keycloak instance. default value : `tmt-frontend-app`
 */
export const setAppConfig = (config: AppConfig) => {
  AppConfig.applicationName = config.applicationName ?? ''
  AppConfig.clientId = config.clientId ?? AppConfig.clientId
  AppConfig.realm = config.realm ?? AppConfig.realm
}
