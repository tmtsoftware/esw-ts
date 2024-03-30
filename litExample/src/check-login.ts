import { consume } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AuthContextLit, litAuthContext } from '@tmtsoftware/esw-ts'

@customElement('check-login')
export class CheckLogin extends LitElement {
  @consume({ context: litAuthContext })
  @property({ attribute: false })
  private authContext?: AuthContextLit

  render() {
    if (this.authContext?.auth && this.authContext.auth.isAuthenticated()) {
      return html`<div><slot name="ok"></slot></div>`
    } else {
      return html`<div><slot name="error"></slot></div>`
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'check-login': CheckLogin
  }
}
