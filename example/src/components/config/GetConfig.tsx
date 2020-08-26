import { download } from 'esw-ts'
import { ConfigData } from 'esw-ts/dist/src/clients/config/models/ConfigData'
import { Option } from 'esw-ts/dist/src/utils/types'
import React, { useContext, useState } from 'react'
import { ConfigContext } from './context/ConfigContext'
import IOOperationComponent from './IOOperationComponent'

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
