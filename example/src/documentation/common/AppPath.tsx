import { setAppConfig } from '@tmtsoftware/esw-ts'
import React from 'react'
//#set-app-config
// inside App.tsx

setAppConfig({applicationName: 'ocs-application' })

export default () => <div>{/* children components */}</div>

//#set-app-config
