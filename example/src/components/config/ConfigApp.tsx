import React, { useContext, useEffect, useState } from 'react'
import CreateConfig from './CreateConfig'
import ConfigError from './ConfigError'
import ListConfig from './ListConfig'
import GetConfig from './GetConfig'
import { AuthContext, ClientRole, ConfigService } from 'esw-ts'

const ConfigApp = () => {
  const { auth } = useContext(AuthContext)
  const [configService, setConfigService] = useState<ConfigService>(new ConfigService( auth ? auth.token : () => ''))

  useEffect(() =>{
    setConfigService(new ConfigService( auth ? auth.token : () => ''))
  },[auth])

  return (
    <div className='row card col s12 m7'>
      <ListConfig configService={configService}/>
      <GetConfig configService={configService}/>
      {
        // #create-config-component
        <ClientRole
          clientRole='admin'
          client='csw-config-server'
          error={<ConfigError />}>
          <CreateConfig configService={configService} />
        </ClientRole>
        // #create-config-component
      }
    </div>
  )
}

export default ConfigApp
