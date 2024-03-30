/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import {createContext, provide} from '@lit/context'
import {LitElement, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {AuthContextLit} from "./AuthContextLit"

export const litAuthContext = createContext<AuthContextLit>('authContext')

@customElement('auth-context-provider')
export class AuthContextProviderLit extends LitElement {
  @property({type: String})
  realm: string = 'TMT'

  @property({attribute: 'client-id', type: String})
  clientId: string = 'tmt-frontend-app'

  @provide({context: litAuthContext})
  @property({attribute: false})
  authContext = new AuthContextLit()

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-context-provider': AuthContextProviderLit
  }
}
