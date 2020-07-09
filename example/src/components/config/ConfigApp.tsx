import React from 'react'
import CreateConfig from './CreateConfig'
import ConfigError from './ConfigError'
import ListConfig from './ListConfig'
import GetConfig from './GetConfig'
import { AuthContext, ClientRole } from 'esw-ts'
import ConfigServiceProvider from './context/ConfigServiceProvider'

const ConfigApp = () => {
  return (
    <div className='row card col s12 m7'>
      <ConfigServiceProvider authContext={AuthContext}>
        <ListConfig/>
        <GetConfig />
        {
          // #create-config-component
          <ClientRole
            clientRole='admin'
            client='csw-config-server'
            error={<ConfigError />}>
            <CreateConfig/>
          </ClientRole>
          // #create-config-component
        }
      </ConfigServiceProvider>
    </div>
  )
}

export default ConfigApp
