/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, provide } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AuthContextLit } from './AuthContextLit'
import type { Auth } from '../../../clients/aas'

export const litAuthContext = createContext<AuthContextLit>('authContext')

@customElement('auth-context-provider')
export class AuthContextProviderLit extends LitElement {
  @property({ type: String })
  realm: string = 'TMT'

  @property({ attribute: 'client-id', type: String })
  clientId: string = 'tmt-frontend-app'

  @property({ attribute: false })
  auth: Auth | null = null

  // Provide the context for user login
  @provide({ context: litAuthContext })
  @property({ attribute: false })
  authContext: AuthContextLit = new AuthContextLit(this.realm, this.clientId, this.auth, this.setAuth)

  // This is called from AuthContextLit when a user logs in or out.
  // Doing it this way to keep AuthContextLit immutable so that property changes are tracked.
  setAuth(auth: Auth | null) {
    this.auth = auth
    console.log('XXX setAuth this.authContext = ', new AuthContextLit(this.realm, this.clientId, auth, this.setAuth))
    this.authContext = new AuthContextLit(this.realm, this.clientId, auth, this.setAuth)
  }

  // You can wrap the application in an <auth-context-provider> to support login/logout
  render() {
    return html` <div class="container">
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-context-provider': AuthContextProviderLit
  }
}
