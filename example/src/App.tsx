import { GlobalConfig, loadGlobalConfig } from '@tmtsoftware/esw-ts'
import React, { useEffect, useState } from 'react'
import ExampleApp from './components/ExampleApp'

export const App = () => {
  const [isInitialised, setInitialised] = useState(false)

  useEffect(() => {
    loadGlobalConfig().then(() => setInitialised(true))
  }, [isInitialised])

  return <div>{isInitialised ? <ExampleApp /> : 'Loading....'}</div>
}
