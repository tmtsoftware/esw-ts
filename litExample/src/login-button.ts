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

  private handleLogin() {
    console.log('XXX Handle login authContext = ', this.authContext)
    this.authContext?.login()
  }

  private handleLogout() {
    console.log('XXX Handle logout')
    this.authContext?.logout()
  }

  render() {
    console.log('XXX render authContext = ', this.authContext)
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
