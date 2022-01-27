import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// #import-components-example
import { AuthContextProvider, CheckLogin, RealmRole } from '@tmtsoftware/esw-ts'
// #import-components-example
import NavComponent from './NavComponent'
import Write from './Write'
import Read from './Read'
import RoleError from './RoleError'
import ConfigApp from './config/ConfigApp'
import LoginError from './LoginError'
import { AppConfig } from '../config/AppConfig'

const basename = import.meta.env.NODE_ENV === 'production' ? `/${AppConfig.applicationName}` : ''
//#example-app
const ExampleApp = () => {
  return (
    <div className='row card col s12 m7'>
      {
        // #AuthContextProvider-component-usage
        <AuthContextProvider config={{ realm: 'TMT', clientId: 'tmt-frontend-app' }}>
          <BrowserRouter basename={basename}>
            <NavComponent />
            <Routes>
              <Route
                path='/secured'
                element={() => (
                  // #checkLogin-component-usage
                  <CheckLogin error={<LoginError />}>
                    <Write />
                  </CheckLogin>
                  // #checkLogin-component-usage
                )}
              />
              <Route path='/config' element={() => <ConfigApp />} />
              <Route
                path='/example_admin'
                element={() => (
                  <CheckLogin error={<LoginError />}>
                    {/*// #realmRole-component-usage */}
                    <RealmRole
                      realmRole='example-admin-role'
                      error={<RoleError message={'User do not have role : example-admin-role'} />}>
                      <div>Example admin role specific functionality</div>
                    </RealmRole>
                    {/*// #realmRole-component-usage */}
                  </CheckLogin>
                )}
              />
              <Route
                path='/example_user'
                element={() => (
                  <CheckLogin error={<LoginError />}>
                    <RealmRole
                      realmRole='person-role'
                      error={<RoleError message={'User do not have role : person-role'} />}>
                      <div>Person role specific functionality</div>
                    </RealmRole>
                  </CheckLogin>
                )}
              />
              <Route path='/public' element={<Read />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
        // #AuthContextProvider-component-usage
      }
    </div>
  )
}
//#example-app

export default ExampleApp
