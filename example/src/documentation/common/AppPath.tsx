import { setAppConfigPath } from '@tmtsoftware/esw-ts'
import React from 'react'
//#set-app-config-path
// inside App.tsx

setAppConfigPath('randomFolder/randomFile.ts')

export default () => <div>{/* children components */}</div>

//#set-app-config-path

/** 
//#folder
/AppRoot
  /src
    /config
      /AppConfig.ts
  /test
  /types
//#folder
*/
