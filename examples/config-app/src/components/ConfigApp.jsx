import React, {useEffect, useState} from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavComponent from './NavComponent'
import { AppConfig } from '../config/AppConfig'
import CreateConfig from './CreateConfig'
import ConfigError from './ConfigError'
import ListConfig from './ListConfig'
import GetConfig from './GetConfig'
import { AuthContextProvider, ClientRole } from 'gateway-tsclient'
import {resolveConfig} from "../config/ResolveConfig";

const ConfigApp = () => {
  const [configURL, setconfigURL] = useState(null);
  const resolveConfigServer = async () => {
    const response = await resolveConfig()
    setconfigURL(response)
  }

  useEffect(() => {
    resolveConfigServer();
  }, []);

  return (
    <div className='row card col s12 m7'>
      <AuthContextProvider config={AppConfig}>
        <BrowserRouter>
          <div>
            <NavComponent />
          </div>
        </BrowserRouter>
        <ListConfig configURL={configURL}/>
        <GetConfig configURL={configURL}/>
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
      </AuthContextProvider>
    </div>
  )
}

export default ConfigApp
