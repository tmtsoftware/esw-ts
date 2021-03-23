import Keycloak, { KeycloakInstance } from 'keycloak-js'
import { AASConfig } from '../../config'
import { Prefix } from '../../models'
import { HttpConnection } from '../location'
import { resolve } from '../location/LocationUtils'
import type { Auth, AuthContextConfig, AuthenticateResult } from './Models'

/**
 * Authentication and Authorization service
 */
export class AuthStore {
  /**
   * Create instance of AuthStore from keycloak.
   *
   * @param keycloak keycloak instance instantiated using keycloak-js
   */
  public static from(keycloak: KeycloakInstance): Auth {
    return {
      logout: keycloak.logout,
      token: () => keycloak.token,
      tokenParsed: () => keycloak.tokenParsed,
      realmAccess: () => keycloak.realmAccess, // todo: should this be called realmRoles?
      resourceAccess: () => keycloak.resourceAccess, // todo: should this be called resourceRoles?
      loadUserProfile: keycloak.loadUserProfile,
      isAuthenticated: () => keycloak.authenticated,
      hasRealmRole: keycloak.hasRealmRole,
      hasResourceRole: keycloak.hasResourceRole
    }
  }

  static onTokenExpired(keycloak: KeycloakInstance): void {
    keycloak
      .updateToken(0)
      .then((refreshed) => {
        if (refreshed) {
          console.log('token refreshed ' + new Date())
        } else {
          console.log('not refreshed ' + new Date())
        }
      })
      .catch(() => {
        throw new Error('Failed to refresh the token, or the session has expired')
      })
  }

  /**
   * Responsible for instantiating keycloak using provided config and authentication. It also creates hooks for refreshing token when
   * token is expired which silently refresh token resulting seamless user experience once logged in
   *
   * @param config    json object which is UI application specific keycloak configuration e.g. realm and clientID.
   * @param url       json object which contains AAS url
   * @param redirect  boolean which decides instantiation mode for keycloak. e.g. login-required or check-sso.
   *                  login-required mode redirects user to login screen if not logged in already. check-sso only checks if already
   *                  logged in without redirecting to login screen if not logged in.
   *
   * @return {{ keycloak, authenticated }} json which contains keycloak instance and authenticated which is promise after
   * initializing keycloak
   */

  // fixme: this function name is confusing . it is doing instantiation of keycloak and returning authentication promise ?
  //  it doing too many things at once?
  public static authenticate(
    config: AuthContextConfig,
    url: string,
    redirect: boolean
  ): AuthenticateResult {
    console.info('instantiating AAS')
    const keycloakConfig = { ...AASConfig, ...config, url }
    const keycloak: KeycloakInstance = Keycloak(keycloakConfig)

    keycloak.onTokenExpired = () => this.onTokenExpired(keycloak)

    const authenticatedPromise = keycloak.init({
      onLoad: redirect ? 'login-required' : 'check-sso',
      flow: 'standard'
    })
    return { keycloak, authenticatedPromise }
  }

  /**
   * Responsible for resolving AAS Server using location service. If not found returns AAS-server-url specified in
   * config
   *
   * @return url      AAS server url
   */
  public static async getAASUrl(): Promise<string> {
    const authConnection = HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
    const location = await resolve(authConnection)

    return location.uri
  }
}
