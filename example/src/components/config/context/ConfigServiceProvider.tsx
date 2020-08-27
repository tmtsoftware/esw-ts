import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, ConfigService } from 'esw-ts'
import { ConfigContext, defaultConfigServiceState } from './ConfigContext'

export interface ConfigServiceProps {
  authContext: typeof AuthContext
  children: React.ReactNode
}

const ConfigServiceProvider = (props: ConfigServiceProps) => {
  const { authContext, children } = props

  const [configService, setConfigService] = useState<ConfigService>(
    defaultConfigServiceState
  )
  // #use-auth-context
  const { auth } = useContext(authContext)
  // #use-auth-context

  const resetConfigService = async () => {
    const service = await ConfigService(auth ? auth.token : () => '')
    setConfigService(service)
  }

  useEffect(() => {
    resetConfigService().catch(() =>
      window.alert('config server is not available')
    )
  }, [auth])

  return (
    <ConfigContext.Provider value={configService}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigServiceProvider
