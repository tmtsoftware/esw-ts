import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { AppConfig } from './config/AppConfig'
import { setAppName } from '@tmtsoftware/esw-ts'

setAppName(AppConfig.applicationName)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
