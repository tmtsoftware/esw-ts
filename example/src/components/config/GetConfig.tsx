import React, { useContext, useState } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { download } from 'esw-ts'
import { ConfigContext } from './context/ConfigContext'
import { ConfigData } from 'esw-ts/dist/src/clients/config/models/ConfigData'
import { Option } from 'esw-ts/dist/src/utils/Option'

function GetConfig() {
  const [err, setErr] = useState('')
  const configService = useContext(ConfigContext)

  const getConfig = async (input: string) => {
    const config: Option<ConfigData> = await configService.getLatest(input)
    if (config) download(config.toBlob(), input)
    else setErr('Config not found')
  }

  return (
    <IOOperationComponent
      txtId='get-config'
      btnId='get-config'
      componentNameProp='Get Config'
      operation='Get'
      output={err}
      api={getConfig}
    />
  )
}

export default GetConfig
