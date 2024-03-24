import { loadGlobalConfig } from '@tmtsoftware/esw-ts'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Task } from '@lit/task'
import '../../src/components/aas/context/AuthContextProviderLit.ts'
import '@shoelace-style/shoelace'
import './check-login.ts'

/**
 * This is the top level example application element
 */
@customElement('example-app')
export class ExampleApp extends LitElement {

  private initTask = new Task(this, {
    task: async () => {
      return await loadGlobalConfig()
    },
    args: () => []
  })

  render() {
    return this.initTask.render({
      initial: () => html`<p>Starting ...</p>`,
      pending: () => html`<p>Loading global config ...</p>`,
      error: (e) => html`<p>Error loading global config: ${e}</p>`,
      complete: () => this.renderMain()
    })
  }

  renderMain() {
    return html`
      <auth-context-provider realm="TMT" client-id="tmt-frontend-app">
        <sl-tab-group>
          <sl-tab slot="nav" panel="public">Public</sl-tab>
          <sl-tab slot="nav" panel="secured">Secured</sl-tab>
          <sl-tab slot="nav" panel="config-link">Config App</sl-tab>
          <sl-tab slot="nav" panel="admin-app">Admin App</sl-tab>
          <sl-tab slot="nav" panel="user-app">User App</sl-tab>

          <sl-tab-panel name="public">This is the public tab panel.</sl-tab-panel>
          <sl-tab-panel name="secured">
            <check-login>
              <div slot="ok">This is the secured tab panel.</div>
              <div slot="error">Please login to proceed.</div>
            </check-login>
          </sl-tab-panel>
          <sl-tab-panel name="config-link">This is the config app tab panel.</sl-tab-panel>
          <sl-tab-panel name="admin-app">This is a admin app tab panel.</sl-tab-panel>
          <sl-tab-panel name="user-app">This is a user app tab panel.</sl-tab-panel>
        </sl-tab-group>
      </auth-context-provider>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-app': ExampleApp
  }
}
