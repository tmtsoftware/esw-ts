import { customElement, state } from 'lit/decorators.js'
import { LitElement, html } from 'lit'
import '@vaadin/tabs'

@customElement('tab-bar')
export class TabBar extends LitElement {

  render() {
    return html`
      <vaadin-tabs>
        <vaadin-tab>Public</vaadin-tab>
        <vaadin-tab>Secured</vaadin-tab>
        <vaadin-tab>Config App</vaadin-tab>
        <vaadin-tab>Admin App</vaadin-tab>
        <vaadin-tab>User App</vaadin-tab>
      </vaadin-tabs>
    `
  }
}
