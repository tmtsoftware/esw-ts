import React, { useState, useContext, ChangeEvent } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { ConfigService } from 'esw-ts'

export function CreateConfig({ configService }: CreateConfigProps) {
  const [response, setResponse] = useState('')
  const [fileContent, setFileContent] = useState<string>('')

  const createConfig = async (input: string) => {
    const config = await configService.create(input, new Blob([fileContent]), false, "Sample commit message" )
    setResponse(config.toString())
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

interface CreateConfigProps {
  configService: ConfigService
}

export default CreateConfig
