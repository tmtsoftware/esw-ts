import React, { useContext, useState } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { ConfigContext } from './context/ConfigContext'

function ListConfig() {
  const [response, setResponse] = useState('')
  const configService = useContext(ConfigContext)
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
export default ListConfig
