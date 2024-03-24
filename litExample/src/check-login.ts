import { consume } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Auth } from '../../src'
import { authContext } from '../../src/components/aas/context/AuthContextProviderLit';

@customElement('check-login')
export class CheckLogin extends LitElement {
  @consume({ context: authContext })
  @property({ attribute: false })
  private auth: Auth | null = null

  render() {
    if (this.auth && this.auth.isAuthenticated && this.auth.isAuthenticated()) {
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
