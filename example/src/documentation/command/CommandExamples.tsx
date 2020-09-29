
//#command-client
import React from 'react'
import {AuthContextProvider} from "esw-ts";

const CommandClient = (): JSX.Element => {

  return (
    <div>
    </div>
  )
}

export default CommandClient
//#command-client


//#landing-update
import React from 'react'

+ import {AuthContextProvider} from "esw-ts";

const Landing = (): JSX.Element => {
  // this config is copied from `src/config/AppConfig.ts` for brevity.
+ const AppConfig = {realm: 'TMT', clientId: 'tmt-frontend-app'}
  return (
    <div>
-      <img className='logo' alt='logo' src={logo} />
-      <h3>Update src/App.tsx and save to reload.</h3>
-
-      <h3>
-        Refer esw-ts library usage from{' '}
-        <a className='link' href='https://github.com/tmtsoftware/esw-ts'>
-          here.
-        </a>
-      </h3>
+      <AuthContextProvider config={AppConfig}>
+         <CommandClient/>
+      </AuthContextProvider>
    </div>
  )
}
export default Landing

//#landing-update
