import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// #import-components-example
import { AuthContextProvider, CheckLogin, RealmRole } from 'esw-ts'
// #import-components-example
import NavComponent from './NavComponent'
import { AppConfig } from '../config/AppConfig'
import Write from './Write'
import Read from './Read'
import ExampleError from './ExampleError'
import ConfigApp from './config/ConfigApp'

const ExampleApp = () => {
  return (
    <div className='row card col s12 m7'>
      {
        // #AuthContextProvider-component-usage
        <AuthContextProvider config={AppConfig}>
          <BrowserRouter>
            <div>
              <NavComponent />
              <Route
                exact
                path='/secured'
                render={(_) => (
                  // #checkLogin-component-usage
                  <CheckLogin error={<ExampleError />}>
                    <Write />
                  </CheckLogin>
                  // #checkLogin-component-usage
                )}
              />
              <Route exact path='/config' render={(_) => <ConfigApp/> }/>
              <Route
                exact
                path='/example_admin'
                render={(_) => (
                  // #realmRole-component-usage
                  <RealmRole
                    realmRole='example-admin-role'
                    error={<ExampleError />}>
                    <div>Example admin role specific functionality</div>
                  </RealmRole>
                  // #realmRole-component-usage
                )}
              />
              <Route
                exact
                path='/example_user'
                render={(_) => (
                  // #clientRole-component-usage
                  <RealmRole
                    realmRole='person-role'
                    error={<ExampleError />}>
                    <div>Person role specific functionality</div>
                  </RealmRole>
                  // #clientRole-component-usage
                )}
              />
              <Route exact path='/public' component={Read} />
            </div>
          </BrowserRouter>
        </AuthContextProvider>
        // #AuthContextProvider-component-usage
      }
    </div>
  )
}

export default ExampleApp
