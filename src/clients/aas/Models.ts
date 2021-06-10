import type KC from 'keycloak-js'

export interface Auth {
  logout: (options?: KC.KeycloakLogoutOptions) => KC.KeycloakPromise<void, void>
  token: () => string | undefined
  tokenParsed: () => (KC.KeycloakTokenParsed & { preferred_username?: string }) | undefined
  realmAccess: () => KC.KeycloakRoles | undefined
  resourceAccess: () => KC.KeycloakResourceAccess | undefined
  loadUserProfile: () => KC.KeycloakPromise<KC.KeycloakProfile, void>
  isAuthenticated: () => boolean | undefined
  hasRealmRole: (role: string) => boolean
  hasResourceRole: (role: string, resource?: string) => boolean
}

export interface AuthenticateResult {
  keycloak: KC.KeycloakInstance
  authenticatedPromise: KC.KeycloakPromise<boolean, KC.KeycloakError>
}

export interface AuthContextConfig {
  realm: string
  clientId: string
}
