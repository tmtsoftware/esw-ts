import React from 'react'
import IOOperationComponent from './IOOperationComponent'

const GetConfig = ({configURL}) => {
  const downloadURI = uri => {
    let link = document.createElement('a')
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getConfig = async input => {
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
    />
  )
}

export default GetConfig
