import { extractHostPort } from '../utils/Utils'
import { GlobalConfig } from './GlobalConfig'

export type LocationInfo = {
  host: string
  port: number
}

export const LocationConfig = extractHostPort(GlobalConfig.locationUrl)
