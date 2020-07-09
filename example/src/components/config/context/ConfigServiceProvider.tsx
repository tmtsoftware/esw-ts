import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, ConfigService } from 'esw-ts'
import { ConfigContext, defaultConfigServiceState } from './ConfigContext'

export interface ConfigServiceProps {
  authContext: typeof AuthContext
  children: React.ReactNode
}

const ConfigServiceProvider = (props: ConfigServiceProps) => {
  const { authContext, children } = props

  const [configService, setConfigService]= useState(defaultConfigServiceState)
  // #use-auth-context
  const { auth } = useContext(authContext)
  // #use-auth-context

  useEffect(() => {
    setConfigService(new ConfigService(auth ? auth.token : () => ''))
  }, [auth])

  return <ConfigContext.Provider value={configService}>{children} </ConfigContext.Provider>
}

export default ConfigServiceProvider
