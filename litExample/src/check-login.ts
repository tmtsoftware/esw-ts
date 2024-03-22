import { customElement, property } from 'lit/decorators.js'
import {LitElement, html} from 'lit';
import {consume} from '@lit/context';
import type { Auth } from '../../src'
import { authContext } from '../../src/components/aas/context/AuthContextProviderLit';

@customElement('check-login')
export class CheckLogin extends LitElement {

  @consume({context: authContext})
  @property({attribute: false})
  private auth: Auth | null = null

  render() {
    console.log('XXX auth = ', this.auth)
     if (this.auth && this.auth.isAuthenticated && this.auth.isAuthenticated()) {
       return html`<div><p>X1</p><slot name="ok"></slot></div>`
     } else {
       return html`<div><p>X2</p><slot name="errorX"></slot></div>`
     }
  }

}
