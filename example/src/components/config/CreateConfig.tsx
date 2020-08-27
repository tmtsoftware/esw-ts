import React, { ChangeEvent, useContext, useState } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { ConfigContext } from './context/ConfigContext'
import { ConfigData, ConfigId } from 'esw-ts'

export function CreateConfig() {
  const [response, setResponse] = useState('')
  const [fileContent, setFileContent] = useState<string>('')

  const configService = useContext(ConfigContext)

  const createConfig = async (input: string) => {
    const config: ConfigId = await configService.create(
      input,
      ConfigData.fromString(fileContent),
      false,
      'Sample commit message'
    )
    setResponse(config.id)
  }

  const updateFileContent = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setFileContent(event.target.value)

  return (
    <div className='card-panel hoverable'>
      <IOOperationComponent
        txtId='file-path'
        btnId='create-config'
        componentNameProp='Create Config'
        operation='Create Config'
        output={response}
        api={createConfig}
      />
      <div className='card-panel hoverable'>
        File Content
        <span>
          <textarea
            id='file-content-txt-area'
            value={fileContent}
            onChange={updateFileContent}
          />
        </span>
      </div>
    </div>
  )
}

export default CreateConfig
