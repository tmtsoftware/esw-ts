import { extractHostPort } from '../utils/Utils'

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

const DefaultConfig: Config = { locationUrl: 'localhost:7654', taiOffset: 37 }

// eslint-disable-next-line import/no-mutable-exports
export let GlobalConfig: Config = DefaultConfig

export const loadConfig = async (): Promise<Config> => {
  const module = <ConfigModule>await import(CONFIG_PATH)
  return module.config
}

export const loadGlobalConfig = async () => {
  if (process.env.NODE_ENV == 'production') {
    GlobalConfig = { ...(await loadConfig()) }
  } else {
    GlobalConfig = DefaultConfig
  }
}
