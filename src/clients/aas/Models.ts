/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import Keycloak from 'keycloak-js'

export interface Auth {
  logout: (options?: Keycloak.KeycloakLogoutOptions) => Promise<void>
  token: () => string | undefined
  tokenParsed: () => (Keycloak.KeycloakTokenParsed & { preferred_username?: string }) | undefined
  realmAccess: () => Keycloak.KeycloakRoles | undefined
  resourceAccess: () => Keycloak.KeycloakResourceAccess | undefined
  loadUserProfile: () => Promise<Keycloak.KeycloakProfile>
  isAuthenticated: () => boolean | undefined
  hasRealmRole: (role: string) => boolean
  hasResourceRole: (role: string, resource?: string) => boolean
}

export interface AuthenticateResult {
  keycloak: Keycloak.KeycloakInstance
  authenticatedPromise: Promise<boolean>
}

export interface AuthContextConfig {
  realm: string
  clientId: string
}
