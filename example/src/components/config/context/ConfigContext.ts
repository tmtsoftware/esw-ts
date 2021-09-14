import { ConfigService } from '@tmtsoftware/esw-ts'
import { createContext } from 'react'

export let defaultConfigServiceState: ConfigService
export let ConfigContext = createContext<ConfigService | undefined>(undefined)
//fixme try to use top-level await
const setDefault = async () => {
  defaultConfigServiceState = await ConfigService(() => '')
  ConfigContext = createContext<ConfigService | undefined>(defaultConfigServiceState)
}

setDefault()
