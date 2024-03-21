import { Auth, loadGlobalConfig } from '@tmtsoftware/esw-ts'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Task } from '@lit/task'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import '../../src/components/aas/context/AuthContextProviderLit.ts'
import './tab-bar.ts'

/**
 * This is the top level example application element
 */
@customElement('example-app')
export class ExampleApp extends LitElement {
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  @property({ type: Number })
  count = 0

  // XXX TODO FIXME
  @property({ attribute: false, reflect: true })
  auth: Auth | null = null

  @property({ type: Boolean })
  failed = false

  private initTask = new Task(this, {
    task: async () => {
      return await loadGlobalConfig().catch(() => {
        console.log('Config.js not found. Failed to Load Global Configuration.')
      })
    },
    args: () => []
  })

  render() {
    return this.initTask.render({
      initial: () => html`<p>Not running yet ...</p>`,
      pending: () => html`<p>Loading ...</p>`,
      error: (e) => html`<p>Error: ${e}</p>`,
      complete: () => this.renderMain()
    })
  }

  renderMain() {
    return html`
      <tab-bar></tab-bar>
      <auth-context-provider realm="TMT" client-id="tmt-frontend-app">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src=${viteLogo} class="logo" alt="Vite logo" />
          </a>
          <a href="https://lit.dev" target="_blank">
            <img src=${litLogo} class="logo lit" alt="Lit logo" />
          </a>
        </div>
        <slot></slot>
        <div class="card">
          <button @click=${this._onClick} part="button">count is ${this.count}</button>
        </div>
        <p class="read-the-docs">${this.docsHint}</p>
      </auth-context-provider>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }

    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }

    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }

    button:hover {
      border-color: #646cff;
    }

    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }

      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'example-app': ExampleApp
  }
}
