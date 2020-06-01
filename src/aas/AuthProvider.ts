/**
 * Responsible for instantiating keycloak and provide context value to consumers
 * config json specific to UI application e.g. realm and clientId
 */
import { TMTAuth } from 'aas/Auth'
import { Auth, AuthContextConfig } from 'aas/Models.ts'

export class AuthProvider {
  constructor(readonly config: AuthContextConfig) {}
  /**
   * Instantiate keycloak and sets TMTAuthStore instance in state. This state can be provided
   * as a context
   */
  async instantiateAAS(url: string) {
    const { keycloak, authenticated } = await TMTAuth.authenticate(this.config, url)
    authenticated
      .then(() => {
        return TMTAuth.from(keycloak)
      })
      .catch(() => {
        throw new Error('AAS initialization failed')
      })
  }

  /**
   * Resolves AAS server and instantiate keycloak in check-sso mode
   */
  async loginWithoutRedirect() {
    const url = await TMTAuth.getAASUrl()
    await this.instantiateAAS(url)
  }

  /**
   * Resolves AAS server and instantiate keycloak in login-required mode
   */
  async login() {
    const url = await TMTAuth.getAASUrl()
    await this.instantiateAAS(url)
  }

  async logout(auth: Auth) {
    if (auth && auth.logout) {
      const logoutPromise = auth.logout()
      logoutPromise.success(() => {
        // setauth(null)
      })
      await auth.logout()
    }
  }
}
