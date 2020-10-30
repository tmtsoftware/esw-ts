import react from 'react';
import {
    CommandService, ComponentId, Prefix, setAppConfigPath, Setup, SubmitResponse
} from "@tmtsoftware/esw-ts";
//#set-app-config-path
// inside App.tsx

setAppConfigPath('randomFolder/randomFile.ts')

export default () => (
    <div>
      {/* children components */}
    </div>
  )

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
