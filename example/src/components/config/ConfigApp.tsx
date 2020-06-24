import React, { useEffect, useState } from 'react'
import CreateConfig from './CreateConfig'
import ConfigError from './ConfigError'
import ListConfig from './ListConfig'
import GetConfig from './GetConfig'
import { ClientRole } from 'esw-ts'
import { resolveConfig } from '../../helpers/ResolveConfig'

const ConfigApp = () => {
  const [configURL, setconfigURL] = useState<string>('')
  const resolveConfigServer = async () => {
    const response = await resolveConfig()
    setconfigURL(response)
  }

  useEffect(() => {
    resolveConfigServer()
  }, [])

  return (
    <div className='row card col s12 m7'>
      <ListConfig configURL={configURL} />
      <GetConfig configURL={configURL} />
      {
        // #create-config-component
        <ClientRole
          clientRole='admin'
          client='csw-config-server'
          error={<ConfigError />}>
          <CreateConfig configURL={configURL} />
        </ClientRole>
        // #create-config-component
      }
    </div>
  )
}

export default ConfigApp
