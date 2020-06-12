import React, { useState, useContext } from 'react'
import IOOperationComponent from './IOOperationComponent'
import { sPost } from './Client'
import { AuthContext } from 'gateway-tsclient'

const CreateConfig = () => {
  const [response, setResponse] = useState(null)
  const [fileContent, setsetFileContent] = useState('')

  // #use-auth-context
  const { auth } = useContext(AuthContext)
  // #use-auth-context

  const callBack = (res) => setResponse(res)

  const createConfig = (input, token) => {
    sPost(
      `http://localhost:4000/config/${input}?comment="Sample commit message"`,
      callBack,
      token,
      fileContent,
    )
  }

  const updateFileContent = (event) => setsetFileContent(event.target.value)

  return (
    <div className='card-panel hoverable'>
      <IOOperationComponent
        txtId='file-path'
        btnId='create-config'
        token={auth.token}
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
