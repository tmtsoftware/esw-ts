import { download, ConfigData } from '@tmtsoftware/esw-ts'
import type { Option } from '@tmtsoftware/esw-ts'
import React, { useContext, useState } from 'react'
import { ConfigContext } from './context/ConfigContext'
import IOOperationComponent from './IOOperationComponent'

function GetConfig() {
  const [err, setErr] = useState('')
  const configService = useContext(ConfigContext)

  const getConfig = async (input: string) => {
    const config: Option<ConfigData> = await configService?.getLatest(input)
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
