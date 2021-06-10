import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

function IOOperationComponent(props: IOOperationProps) {
  const [input, setInput] = useState('')
  const { txtId, btnId, componentNameProp, operation, output } = props

  const updateInput: ChangeEventHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(event.target.value)
  }

  const handleClick = () => props.api(input)

  return (
    <div className='card-panel hoverable'>
      <h6>{componentNameProp} Request</h6>
      <div>
        <span>
          <textarea
            id={txtId + '-txt-area'}
            value={input}
            onChange={updateInput}
          />
        </span>
      </div>
      <div>
        <button id={btnId + '-btn'} onClick={handleClick}>
          {operation}
        </button>
      </div>
      <div>
        <span>
          <div id={btnId + '-output'}> {output} </div>
        </span>
      </div>
    </div>
  )
}

interface IOOperationProps {
  txtId: string
  btnId: string
  componentNameProp: string
  operation: string
  output: string
  api: Function
}

export default IOOperationComponent
