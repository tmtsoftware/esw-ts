import React, { useEffect, useState } from 'react'
import { Provider } from './AuthContext'
import { Auth } from '../../Models'
import { TMTAuth } from '../../Auth'

/**
 * React component which is wrapper over provider of react context api.
 * Responsible for instantiating keycloak and provide context value to consumers
 * props -
 * config json specific to UI application e.g. realm and clientId
 * children - react component or html element which can have consumer to access
 * context provided
 */

export interface AuthContextConfig {
  realm: string
  clientId: string
  username?: string
  password?: string
}

export interface AuthContextProps {
  config: AuthContextConfig
  children: React.ReactNode
}

const AuthContextProvider = (props: AuthContextProps) => {
  const [auth, setauth] = useState<Auth | null>(null)

  /**
   * Instantiate keycloak and sets TMTAuthStore instance in state. This state can be provided
   * as a context
   */
  const instantiateAAS = async (url: string, redirect: boolean) => {
    const { keycloak, authenticatedPromise } = await TMTAuth.authenticate(
      props.config,
      url,
      redirect
    )
    authenticatedPromise
      .then(() => {
        const _auth = TMTAuth.from(keycloak)
        setauth(_auth)
      })
      .catch((e) => {
        console.error(e)
        setauth(null)
      })
  }

  /**
   * Resolves AAS server and instantiate keycloak in check-sso mode
   */
  const loginWithoutRedirect = async () => {
    const url = await TMTAuth.getAASUrl()
    await instantiateAAS(url, false)
  }

  useEffect(() => {
    loginWithoutRedirect()
  }, [])

  /**
   * Resolves AAS server and instantiate keycloak in login-required mode
   */
  const login = async () => {
    const url = await TMTAuth.getAASUrl()
    console.log(url)
    await instantiateAAS(url, true)
  }

  const logout = async () => {
    if (auth && auth.logout) {
      const logoutPromise = auth.logout()
      logoutPromise.then(() => {
        setauth(null)
      })
      await auth.logout()
    }
  }

  return <Provider value={{ auth: auth, login: login, logout: logout }}>{props.children}</Provider>
}

export default AuthContextProvider
