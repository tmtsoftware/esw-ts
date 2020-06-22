import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// #import-components-example
import {
  CheckLogin,
  RealmRole,
  ClientRole,
  AuthContextProvider,
} from 'esw-ts'
// #import-components-example
import { AppConfig } from '../config/AppConfig'

const ExampleApp = () => {
  return (
    <div className='row card col s12 m7'>
      {
        // #AuthContextProvider-component-usage
        <AuthContextProvider config={AppConfig}>
          <BrowserRouter>
            <div>
              <Route
                exact
                path='/secured'
                render={_ => (
                  // #checkLogin-component-usage
                  <div>
                    example app
                  </div>
                  // #checkLogin-component-usage
                )}
              />
            </div>
          </BrowserRouter>
        </AuthContextProvider>
        // #AuthContextProvider-component-usage
      }
    </div>
  )
}

export default ExampleApp
