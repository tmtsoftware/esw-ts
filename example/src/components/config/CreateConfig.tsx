import React, { useState, useContext, ChangeEvent } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { sPost } from '../../helpers/Client'
import { AuthContext, TokenFactory } from 'esw-ts'
import { InferProps, string } from 'prop-types'

export function CreateConfig(props: InferProps<typeof CreateConfig.propTypes>) {
  const [response, setResponse] = useState('')
  const [fileContent, setsetFileContent] = useState('')

  // #use-auth-context
  const { auth } = useContext(AuthContext)
  // #use-auth-context

  const callBack = (res: string) => setResponse(res)

  const createConfig = (input: string, token: TokenFactory) => {
    sPost(
      `${props.configURL}config/${input}?comment="Sample commit message"`,
      callBack,
      token,
      fileContent
    )
  }

  const updateFileContent = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setsetFileContent(event.target.value)

  return (
    <div className='card-panel hoverable'>
      <IOOperationComponent
        txtId='file-path'
        btnId='create-config'
        token={auth?.token ? auth.token : () => null}
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
CreateConfig.propTypes = {
  configURL: string
}
export default CreateConfig
