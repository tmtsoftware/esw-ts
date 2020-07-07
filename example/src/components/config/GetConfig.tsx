import React from 'react'
import IOOperationComponent from './IOOperationComponent'
import { ConfigService } from 'esw-ts'
import { download } from 'esw-ts'

function GetConfig({ configService }: GetConfigProps) {
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

interface GetConfigProps {
  configService: ConfigService
}

export default GetConfig
