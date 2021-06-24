import { extractHostPort } from '../utils/Utils'
import { loadConfig } from './GlobalConfig'

export type LocationInfo = {
  host: string
  port: number
}

const locationInfoDevEnv = { host: 'localhost', port: 7654 }

export const LocationConfig = async (): Promise<LocationInfo> => {
  return process.env.NODE_ENV == 'production'
    ? loadConfig().then((globalConfig) => extractHostPort(globalConfig.locationUrl))
    : locationInfoDevEnv
}
