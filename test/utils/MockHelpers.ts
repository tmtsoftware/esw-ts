import { Server } from 'mock-socket'
import { KeycloakInstance } from 'keycloak-js'

export const wsMockWithResolved = <T>(data: T, mockServer: Server) =>
  mockServer.on('connection', (socket) =>
    socket.on('message', () => socket.send(JSON.stringify(data)))
  )

export const mockedKeyCloakInstance = (): KeycloakInstance => {
  return {
    authenticated: false,
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
    authenticated: true,
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
