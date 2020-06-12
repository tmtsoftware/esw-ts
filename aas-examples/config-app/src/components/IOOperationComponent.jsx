import React, { useState } from 'react'
import PropTypes from 'prop-types'

const IOOperationComponent = props => {
  const [input, setInput] = useState('')
  const { txtId, btnId, componentNameProp, operation, output } = props

  const updateInput = event => setInput(event.target.value)
  const handleClick = () => props.api(input, props.token)

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

IOOperationComponent.propTypes = {
  txtId: PropTypes.string,
  btnId: PropTypes.string,
  componentNameProp: PropTypes.string,
  operation: PropTypes.string,
  output: PropTypes.string,
  api: PropTypes.func,
}

export default IOOperationComponent
