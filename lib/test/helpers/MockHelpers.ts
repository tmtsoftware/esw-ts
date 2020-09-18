import {
  KeycloakInstance,
  KeycloakResourceAccess,
  KeycloakRoles,
  KeycloakTokenParsed
} from 'keycloak-js'
import { Server } from 'mock-socket'
import { Auth } from '../../src/clients/aas'

export const wsMockWithResolved = <T>(data: T, mockServer: Server) =>
  mockServer.on('connection', (socket) =>
    socket.on('message', () => socket.send(JSON.stringify(data)))
  )

export const mockedKeyCloakInstance = (isAuthenticated = true): KeycloakInstance => {
  return {
    authenticated: isAuthenticated,
    accountManagement: jest.fn(),
    clearToken: jest.fn(),
    createAccountUrl: jest.fn(),
    createLoginUrl: jest.fn(),
    createLogoutUrl: jest.fn(),
    createRegisterUrl: jest.fn(),
    hasRealmRole: jest.fn(),
    hasResourceRole: jest.fn(),
    isTokenExpired: jest.fn(),
    loadUserInfo: jest.fn(),
    loadUserProfile: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    init: jest.fn().mockImplementation(() => {
      return Promise.resolve(true)
    }),
    onTokenExpired: jest.fn(() => console.log('in token expire handler')),
    updateToken: jest.fn().mockImplementation(() => {
      return Promise.resolve(true)
    })
  }
}

export const mockAuth = (
  isAuthenticated = true,
  hasResourceRole = true,
  testRealmRoles = 'test-realm-roles'
) => {
  const tokenParsed: KeycloakTokenParsed = {
    exp: 10
  }
  const keycloakRoles: KeycloakRoles = { roles: [testRealmRoles] }
  const keycloakResourceAccess: KeycloakResourceAccess = { mockResource: keycloakRoles }
  const auth: Auth = {
    hasRealmRole: (role) => keycloakRoles.roles.includes(role),
    hasResourceRole: () => hasResourceRole,
    isAuthenticated: () => isAuthenticated,
    logout: jest.fn(),
    token: () => 'token string',
    tokenParsed: () => tokenParsed,
    realmAccess: () => keycloakRoles,
    resourceAccess: () => keycloakResourceAccess,
    loadUserProfile: jest.fn()
  }
  return auth
}
