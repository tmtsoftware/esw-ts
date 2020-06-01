import { KeycloakInstance, KeycloakPromise } from 'keycloak-js'
import * as Keycloak from 'keycloak-js'

export const mockedKeyCloakInstance = (mockInitHandler: jest.Mock): KeycloakInstance => {
  return {
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
    init: mockInitHandler,
    onTokenExpired: jest.fn(),
    updateToken: jest.fn().mockImplementation(() => {
      return Promise.resolve(true)
    })
  }
}
