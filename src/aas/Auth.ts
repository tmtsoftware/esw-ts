import * as Keycloak from 'keycloak-js'
import { KeycloakInstance } from 'keycloak-js'
import { resolve } from '../utils/Resolve'
import { AASConfig } from '../config/AASConfig'
import { Auth, AuthContextConfig, AuthenticateResult } from './Models'
import { HttpConnection } from '../clients/location'
import { Prefix } from '../models'

/**
 * Adapter for authentication and authorization service
 */
class AuthStore {
  /**
   * Create instance of TMTAuth from keycloak.
   *
   * @param keycloak keycloak instance instantiated using keyclok-js
   */
  public from: (keycloak: KeycloakInstance) => Auth = (keycloak) => ({
    logout: keycloak.logout,
    token: () => keycloak.token,
    tokenParsed: () => keycloak.tokenParsed,
    realmAccess: () => keycloak.realmAccess, // todo: should this be called realmRoles?
    resourceAccess: () => keycloak.resourceAccess, // todo: should this be called resourceRoles?
    loadUserProfile: keycloak.loadUserProfile,
    isAuthenticated: () => keycloak.authenticated,
    hasRealmRole: keycloak.hasRealmRole,
    hasResourceRole: keycloak.hasResourceRole
  })

  onTokenExpired(keycloak: KeycloakInstance): void {
    keycloak
      .updateToken(0)
      .then(() => console.info('token refreshed successfully'))
      .catch(() => {
        throw new Error('Failed to refresh the token, or the session has expired')
      })
  }
  /**
   * Responsible for instantiating keycloak using provided config and authentication. It also creates hooks for refreshing token when
   * token is expired which silently refresh token resulting seamless user experience once logged in
   *
   * @param config json object which is UI application specific keycloak configuration e.g. realm and clientID.
   * @param url json object which contains AAS url
   * @param redirect boolean which decides instantiation mode for keycloak. e.g. login-required or check-sso.
   * login-required mode redirects user to login screen if not logged in already. check-sso only checks if already
   * logged in without redirecting to login screen if not logged in.
   * @return {{ keycloak, authenticated }} json which contains keycloak instance and authenticated which is promise after
   * initializing keycloak
   */

  // fixme: this function name is confusing . it is doing instantiation of keycloak and returning authentication promise ?
  //  it doing too many things at once?
  public authenticate = (
    config: AuthContextConfig,
    url: string,
    redirect: boolean
  ): AuthenticateResult => {
    console.info('instantiating AAS')
    const keycloakConfig = { ...AASConfig, ...config, url }
    const keycloak: KeycloakInstance = Keycloak(keycloakConfig)

    keycloak.onTokenExpired = () => this.onTokenExpired(keycloak)

    const authenticatedPromise = keycloak.init({
      onLoad: redirect ? 'login-required' : 'check-sso',
      flow: 'implicit'
    })
    return { keycloak, authenticatedPromise }
  }

  /**
   * Responsible for resolving AAS Server using location service. If not found returns AAS-server-url specified in
   * config
   *
   * @return url string which is AAS server url
   */
  public getAASUrl: () => Promise<string> = async () => {
    const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
    const location = await resolve(authConnection)
    return location.uri
  }
}

export const TMTAuth = new AuthStore()
