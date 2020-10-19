import { ConfigService } from '@tmtsoftware/esw-ts'
import { createContext } from 'react'

export let defaultConfigServiceState: ConfigService
export let ConfigContext: React.Context<ConfigService>
//fixme try to use top-level await
const setDefault = async () => {
  defaultConfigServiceState = await ConfigService(() => '')
  ConfigContext = createContext<ConfigService>(defaultConfigServiceState)
}

setDefault()
