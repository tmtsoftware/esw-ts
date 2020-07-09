import React, { useContext } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { download } from 'esw-ts'
import { ConfigContext } from './context/ConfigContext'

function GetConfig() {
  const configService = useContext(ConfigContext)

  const getConfig = async (input: string) => {
    download(await configService.getLatest(input), input)
  }

  return (
    <IOOperationComponent
      txtId='get-config'
      btnId='get-config'
      componentNameProp='Get Config'
      operation='Get'
      output={''}
      api={getConfig}
    />
  )
}

export default GetConfig
