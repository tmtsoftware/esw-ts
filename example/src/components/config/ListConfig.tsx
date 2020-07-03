import React, { useState } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { ConfigService } from 'esw-ts'

function ListConfig({ configService }: ListConfigProps) {
  const [response, setResponse] = useState('')

  const listConfig = async () => {
    const list = await configService.list()
    setResponse(JSON.stringify(list))
  }

  return (
    <IOOperationComponent
      txtId='list-config'
      btnId='list-config'
      componentNameProp='List Config'
      operation='List'
      output={response}
      api={listConfig}
    />
  )
}
interface ListConfigProps {
  configService: ConfigService
}
export default ListConfig
