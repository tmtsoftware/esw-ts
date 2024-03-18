import React from 'react'
import './index.css'
import { App } from './App'
import { AppConfig } from './config/AppConfig'
import { setAppName } from '@tmtsoftware/esw-ts'
import { createRoot } from 'react-dom/client'

setAppName(AppConfig.applicationName)
const domNode = document.getElementById('root')
const root = createRoot(domNode!)
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
