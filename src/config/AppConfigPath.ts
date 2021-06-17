const isProd = process.env.NODE_ENV === 'production'
const app_name = process.env.APP_NAME
// eslint-disable-next-line import/no-mutable-exports
export let APP_CONFIG_PATH = isProd
  ? `/${app_name}/_dist_/config/AppConfig.js`
  : `/_dist_/config/AppConfig.js`

export const setAppConfigPath = (path: string) => {
  APP_CONFIG_PATH = path
}
