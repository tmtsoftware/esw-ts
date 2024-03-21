import { Auth, loadGlobalConfig } from '@tmtsoftware/esw-ts'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Task } from '@lit/task'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import '../../src/components/aas/context/AuthContextProviderLit.ts'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'

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
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab slot="nav" panel="custom">Custom</sl-tab>
          <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
          <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
          <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
          <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
          <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
        </sl-tab-group>
      </auth-context-provider>
    `;
  }

  // static styles = css`
  //   h1 {
  //     font-size: var(--lumo-font-size-l);
  //     left: var(--lumo-space-l);
  //     margin: 0;
  //     position: absolute;
  //   }
  //
  // `
}

declare global {
  interface HTMLElementTagNameMap {
    'example-app': ExampleApp
  }
}
