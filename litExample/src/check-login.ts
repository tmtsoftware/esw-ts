import { consume } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AuthContextType } from '../../src'
import { litAuthContext } from '@tmtsoftware/esw-ts'
// import { litAuthContext } from '../../src/components/aas/context/AuthContextProviderLit.ts'

@customElement('check-login')
export class CheckLogin extends LitElement {
  @consume({ context: litAuthContext })
  @property({ attribute: false })
  private authContext: AuthContextType = AuthContextDefaultState

  render() {
    if (this.authContext.auth && this.authContext.auth.isAuthenticated()) {
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
