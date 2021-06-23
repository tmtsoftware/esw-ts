import { setAppName } from '@tmtsoftware/esw-ts'
import React from 'react'
import ExampleApp from './components/ExampleApp'
import { AppConfig } from './config/AppConfig'

setAppName(AppConfig.applicationName)

export const App = () => (
  <div>
    <ExampleApp />
  </div>
)
