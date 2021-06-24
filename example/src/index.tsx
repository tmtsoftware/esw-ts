import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { App } from './App'
import { AppConfig } from './config/AppConfig'
import { setAppName } from '@tmtsoftware/esw-ts'

setAppName(AppConfig.applicationName)

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
