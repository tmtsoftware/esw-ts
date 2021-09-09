const CONFIG_PATH = '/config.js'

type ConfigModule = { config: Config }

export type Config = {
  locationUrl: string
  taiOffset: number
}

export type LocationInfo = {
  host: string
  port: number
}

const DefaultConfig: Config = { locationUrl: 'http://localhost:7654', taiOffset: 37 }

// eslint-disable-next-line import/no-mutable-exports
export let GlobalConfig: Config = DefaultConfig

const loadConfig = async (): Promise<Config> => {
  const module = <ConfigModule>await import(CONFIG_PATH)
  return module.config
}

export const loadGlobalConfig = async () => {
  process.env.NODE_ENV == 'production' ? (GlobalConfig = { ...(await loadConfig()) }) : (GlobalConfig = DefaultConfig)
  console.log('Config loaded successfully in', process.env.NODE_ENV, 'mode')
  console.table(GlobalConfig)
}
