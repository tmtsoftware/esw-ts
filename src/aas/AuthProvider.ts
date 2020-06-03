/**
 * Responsible for instantiating keycloak and provide context value to consumers
 * config json specific to UI application e.g. realm and clientId
 */
import { TMTAuth } from './Auth'
import { Auth, AuthContextConfig } from './Models'

// do we need this in main scope?
// we can have this in example folder showing how to use the auth layer
export class AuthProvider {
  constructor(readonly config: AuthContextConfig) {}
  /**
   * Instantiate keycloak and sets TMTAuthStore instance in state. This state can be provided
   * as a context
   */
  private async instantiateAAS(url: string, redirect: boolean) {
    const { keycloak, authenticatedPromise } = await TMTAuth.authenticate(
      this.config,
      url,
      redirect
    )
    const authenticated = await authenticatedPromise
    if (!authenticated)
      throw new Error(
        `Authentication failed for Realm ${this.config.realm} & clientId ${this.config.clientId}.Please make sure it is configured in AAS`
      )
    return TMTAuth.from(keycloak)
  }

  /**
   * Resolves AAS server and instantiate keycloak in check-sso mode
   */
  async loginWithoutRedirect() {
    const url = await TMTAuth.getAASUrl()
    await this.instantiateAAS(url, false)
  }

  /**
   * Resolves AAS server and instantiate keycloak in login-required mode
   */
  async login() {
    const url = await TMTAuth.getAASUrl()
    await this.instantiateAAS(url, true)
  }

  async logout(auth: Auth) {
    if (auth && auth.logout) {
      await auth.logout()
    }
  }
}
