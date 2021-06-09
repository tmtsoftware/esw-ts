// eslint-disable-next-line import/no-mutable-exports
export let APP_CONFIG_PATH = '/_dist_/config/AppConfig.js'

export const setAppConfigPath = (path: string) => {
  APP_CONFIG_PATH = path
}
