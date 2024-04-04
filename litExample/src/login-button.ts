import { consume } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AuthContextLit, litAuthContext, setAppName } from '@tmtsoftware/esw-ts'

setAppName('example')

@customElement('login-button')
export class LoginButton extends LitElement {
  @consume({ context: litAuthContext, subscribe: true })
  @property({ attribute: false })
  private authContext?: AuthContextLit

  private async handleLogin() {
    await this.authContext?.login()
  }

  private async handleLogout() {
    await this.authContext?.logout()
  }

  render() {
    if (this.authContext?.auth && this.authContext.auth.isAuthenticated()) {
      return html` <sl-button @click=${this.handleLogout}>Logout</sl-button>`
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
