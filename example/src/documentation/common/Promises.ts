import {
  CommandService,
  ComponentId,
  Prefix,
  Setup,
  SubmitResponse
} from '@tmtsoftware/esw-ts'

const dd = async () => {
  //#promises

  const prefix = new Prefix('ESW', 'component_1')
  const componentId = new ComponentId(prefix, 'HCD')

  CommandService(componentId)
    .then((commandService) => {
      const setup1 = new Setup(prefix, 'move', [])
      const setup2 = new Setup(prefix, 'rotate', [])
      const setup3 = new Setup(prefix, 'set', [])

      const responsePromise = commandService.submit(setup1)

      //sequential way to handle multiple submit calls
      responsePromise
        .then((submitResponse1) => {
          handleResponse(submitResponse1)
          commandService.submit(setup2).then((submitResponse2) => {
            handleResponse(submitResponse2)
            commandService.query(submitResponse2.runId).then(fetchNewESWState)
          })
        })
        .catch(handleError)

      // parallel way to handle multiple promises
      const responsePromise3 = commandService.submit(setup3)

      Promise.all([responsePromise, responsePromise3]).then(
        (submitResponses) => {
          submitResponses.forEach(handleResponse)
          const lastResponse = submitResponses.pop()
          if (lastResponse) {
            commandService.query(lastResponse.runId).then(fetchNewESWState)
          }
        }
      )
    })
    .catch((err) => {
      handleError(err)
    })

  const handleError = (error: Error) => {
    // See Error handling section for in general details
    throw new Error(error.message)
  }
  const handleResponse = (response: SubmitResponse) => {
    // See Response handling section for in general details
    console.log(response)
  }

  const fetchNewESWState = () => {
    // fetch new state from backend
  }
  //#promises
}

const ddd = async () => {
  //#async-await

  const handleError = (error: Error) => {
    // See Error handling section for details
    throw new Error(error.message)
  }
  const handleResponse = (response: SubmitResponse) => {
    // See Response handling section for more details
    console.log(response)
  }

  const prefix = new Prefix('ESW', 'component_1')
  const componentId = new ComponentId(prefix, 'HCD')
  try {
    const commandService = await CommandService(componentId)
    const setup1 = new Setup(prefix, 'move', [])
    const setup2 = new Setup(prefix, 'rotate', [])
    const setup3 = new Setup(prefix, 'set', [])

    //sequential way to handle multiple submit calls
    await commandService.submit(setup1)
    const responsePromise2 = await commandService.submit(setup2)
    const queryResponse = await commandService.query(responsePromise2.runId)
    handleResponse(queryResponse)

    // parallel way to handle multiple promises
    const responsePromise3 = commandService.submit(setup3)
    const responsePromise4 = commandService.submit(setup1)

    const submitResponses = await Promise.all([
      responsePromise3,
      responsePromise4
    ])

    submitResponses.forEach(handleResponse)
    const lastResponse = submitResponses.pop()
    if (lastResponse) {
      const queryRes = commandService.query(lastResponse.runId)
    }
  } catch (err) {
    handleError(err)
  }
  //#async-await
}
