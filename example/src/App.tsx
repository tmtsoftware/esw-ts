import { loadGlobalConfig } from '@tmtsoftware/esw-ts'
import React, { useEffect, useState } from 'react'
import ExampleApp from './components/ExampleApp'

export const App = () => {
  const [isInitialised, setInitialised] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    loadGlobalConfig()
      .then(() => setInitialised(true))
      .catch(() => {
        console.log('Config.js not found. Failed to Load Global Configuration.')
        setError(true)
      })
  }, [isInitialised])
  if (isError) return <div> Failed to load global config </div>
  return <div>{isInitialised ? <ExampleApp /> : 'Loading....'}</div>
}
