import { setAppConfig } from '@tmtsoftware/esw-ts'
import React from 'react'

import ExampleApp from './components/ExampleApp'

setAppConfig({ applicationName: 'example' })

export const App = () => (
  <div>
    <ExampleApp />
  </div>
)
