import React from 'react'
import IOOperationComponent from './IOOperationComponent'
import { InferProps, string } from 'prop-types'

function GetConfig({ configURL }: InferProps<typeof GetConfig.propTypes>) {
  const downloadURI = (uri: string) => {
    let link = document.createElement('a')
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getConfig = async (input: string) => {
    console.log(input)
    downloadURI(`${configURL}config/${input}`)
  }

  return (
    <IOOperationComponent
      txtId='get-config'
      btnId='get-config'
      componentNameProp='Get Config'
      operation='Get'
      output={null}
      api={getConfig}
      token={() => ''}
    />
  )
}
GetConfig.propTypes = {
  configURL: string
}
export default GetConfig
