/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react'
import { Provider } from './AuthContext'
import { Auth, AuthContextConfig, AuthStore } from '../../../clients/aas'

export interface AuthContextProps {
  config?: AuthContextConfig
  children: React.ReactNode
}

const defaultAuthConfig = {
  realm: 'TMT',
  clientId: 'tmt-frontend-app'
}
// TODO Add unit tests
/**
 * React component which is wrapper over provider of react context api.
 * Responsible for instantiating keycloak and provide context value to consumers
 * props -
 * config json specific to UI application e.g. realm and clientId
 * children - react component or html element which can have consumer to access
 * context provided
 */
const AuthContextProvider = (props: AuthContextProps) => {
  const [auth, setAuth] = useState<Auth | null>(null)

  /**
   * Instantiate keycloak and sets AuthStore instance in state. This state can be provided
   * as a context
   */
  const instantiateAAS = async (url: string, redirect: boolean) => {
    const keycloakConfig: AuthContextConfig = props.config ? props.config : defaultAuthConfig

    const { keycloak, authenticatedPromise } = AuthStore.authenticate(keycloakConfig, url, redirect)
    try {
      await authenticatedPromise
      const _auth = AuthStore.from(keycloak)
      setAuth(_auth)
    } catch (e) {
      console.error(e)
      setAuth(null)
    }
  }

  /**
   * Resolves AAS server and instantiate keycloak in check-sso mode
   */
  const loginWithoutRedirect = async () => {
    const url = await AuthStore.getAASUrl()
    await instantiateAAS(url, false)
  }

  useEffect(() => {
    loginWithoutRedirect()
  }, [])

  /**
   * Resolves AAS server and instantiate keycloak in login-required mode
   */
  const login = async () => {
    const url = await AuthStore.getAASUrl()
    console.log(url)
    await instantiateAAS(url, true)
  }

  const logout = async () => {
    if (auth && auth.logout) {
      const logoutPromise = auth.logout()
      logoutPromise.then(() => {
        setAuth(null)
      })
      await auth.logout()
    }
  }

  return <Provider value={{ auth: auth, login: login, logout: logout }}>{props.children}</Provider>
}

export default AuthContextProvider
