import type {
  KeycloakInstance,
  KeycloakResourceAccess,
  KeycloakRoles,
  KeycloakTokenParsed
} from 'keycloak-js'
import type { Server } from 'mock-socket'
import type { Auth } from '../../src/clients/aas'

export const wsMockWithResolved = <T>(data: T, mockServer: Server) =>
  mockServer.on('connection', (socket) => socket.on('message', () => socket.send(data as any)))

export const mockedKeyCloakInstance = (isAuthenticated = true): KeycloakInstance => {
  return {
    authenticated: isAuthenticated,
    accountManagement: jest.fn(),
    clearToken: jest.fn(),
    createAccountUrl: jest.fn(),
    createLoginUrl: jest.fn(),
    createLogoutUrl: jest.fn(),
    tokenParsed: { preferred_username: 'esw-user' } as KeycloakTokenParsed,
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
      return Promise.resolve(
        'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwalNqOFJvanN1eG1ZRVpRQjNyeXBFanZPWE92a3dtWVl0azVma0ZjUC1zIn0.eyJleHAiOjE2MTQ3NzA1MDgsImlhdCI6MTYxNDc3MDIwOCwianRpIjoiODgyNjMyYTgtNTUzZC00MjY0LWJlZDctMDU3ZWEyZjBjNWRmIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4xMDM6ODA4MS9hdXRoL3JlYWxtcy9UTVQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODc4OTljMmUtNzIwYy00YjE3LWE3ZDQtZGQwNzFkYWRiZDAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidG10LWZyb250ZW5kLWFwcCIsInNlc3Npb25fc3RhdGUiOiI5MDY3MzAyYy03MWU0LTRjYjctYTYzOS1hMjYwMDk4MDZmMDMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiY29uZmlnLWFkbWluIiwiZXN3LXVzZXIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZXN3LXVzZXIiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.kubzFlCnI76WkmywzclfBd1xCcBrfufZAcdaa7vSIWXl_gQp7BXu3I9810yc839WnhqHqvzD1_jT-jInLrza8PsPDQhjgxuGnqRxk0C1IinNWQ5RhHVL6DxJFHnpwV5y6kz07aN46B30Y26oAXZsP74zjkWNzKj-ttTwKCl9LkA8im9Nc10PNToSszgMfIeAcfbuKmp451I3cBkC7hf7K6uRZyR9kJrNrdqmAKh5CsxHfHUOiSmarYlvE36rFOUdyU4O7DFHyHVuHs8w3tqOG5fnCRZaXkjpbRXb1snZycfOnuyvnf9SnAayd_bKiaQuiBzr2agdPgOZx_Jg9w4eSA'
      )
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
    tokenParsed: () => ({ ...tokenParsed, preferred_username: 'esw-user' }),
    realmAccess: () => keycloakRoles,
    resourceAccess: () => keycloakResourceAccess,
    loadUserProfile: jest.fn()
  }
  return auth
}
