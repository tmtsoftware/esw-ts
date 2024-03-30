/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { type Auth, type AuthContextConfig, AuthStore } from '../../../clients/aas'

export class AuthContextLit {
  auth: Auth | null = null
  realm: string = 'TMT'
  clientId: string = 'tmt-frontend-app'

  /**
   * Instantiate keycloak and sets AuthStore instance in state. This state can be provided
   * as a context
   */
  private async instantiateAAS(url: string, redirect: boolean) {
    const keycloakConfig: AuthContextConfig = { realm: this.realm, clientId: this.clientId }

    const { keycloak, authenticatedPromise } = AuthStore.authenticate(keycloakConfig, url, redirect)
    try {
      await authenticatedPromise
      const _auth = AuthStore.from(keycloak)
      this.auth = _auth
    } catch (e) {
      console.error(e)
      this.auth = null
    }
  }

  /**
   * Resolves AAS server and instantiate keycloak in check-sso mode
   */
  async loginWithoutRedirect() {
    const url = await AuthStore.getAASUrl()
    await this.instantiateAAS(url, false)
  }

  /**
   * Resolves AAS server and instantiate keycloak in login-required mode
   */
  async login() {
    const url = await AuthStore.getAASUrl()
    console.log(url)
    await this.instantiateAAS(url, true)
  }

  async logout() {
    if (this.auth && this.auth.logout) {
      const logoutPromise = this.auth.logout()
      logoutPromise.then(() => {
        this.auth = null
      })
      await this.auth.logout()
    }
  }
}
