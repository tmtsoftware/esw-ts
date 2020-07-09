import { ConfigService } from 'esw-ts'
import { createContext } from 'react'

const defaultConfigServiceState = new ConfigService(() => '')

const ConfigContext = createContext<ConfigService>(defaultConfigServiceState)

export { ConfigContext, defaultConfigServiceState }
