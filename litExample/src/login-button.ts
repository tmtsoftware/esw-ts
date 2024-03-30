import { consume } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AuthContextType } from '../../src'
import { litAuthContext } from '../../src/components/aas/context/AuthContextProviderLit';
import { AuthContextDefaultState } from '../../src/components/aas/context/AuthContextType.ts'
import { setAppName } from '@tmtsoftware/esw-ts'

setAppName('example')

@customElement('login-button')
export class LoginButton extends LitElement {
  @consume({ context: litAuthContext })
  @property({ attribute: false })
  private authContext: AuthContextType = AuthContextDefaultState

  private handleLogin() {
    console.log('XXX Handle login xxx')
    this.authContext.login()
  }

  private handleLogout() {
    console.log('XXX Handle logout')
    this.authContext.logout()
  }

  render() {
    if (this.authContext.auth && this.authContext.auth.isAuthenticated()) {
      return html`
        <sl-button @click=${this.handleLogout}>Logout</sl-button>`
    } else {
      return html`<sl-button @click=${this.handleLogin}>Login</sl-button>`
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-button': LoginButton
  }
}
