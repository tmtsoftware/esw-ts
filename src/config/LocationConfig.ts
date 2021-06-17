import { extractHostPort } from '../utils/Utils'
import { loadConfig } from './GlobalConfig'

export type LocationInfo = {
  host: string
  port: number
}

const locationInfoDevEnv = { host: 'localhost', port: 7654 }
const isProdEnv = process.env.NODE_ENV === 'production'

export const LocationConfig = async (): Promise<LocationInfo> =>
  isProdEnv
    ? loadConfig().then((globalConfig) => extractHostPort(globalConfig.locationUrl))
    : locationInfoDevEnv
