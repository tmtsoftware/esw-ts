import { ConfigService } from 'esw-ts'
import { createContext } from 'react'

export const defaultConfigServiceState = new ConfigService(() => '')

export const ConfigContext = createContext<ConfigService>(defaultConfigServiceState)

