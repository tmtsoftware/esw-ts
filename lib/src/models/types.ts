export type Done = 'Done'

export type Failed = {
  _type: 'Failed'
  msg: string
}

export type Unhandled = {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}

export type Option<T> = T | undefined
/**
 * A function which return valid AAS token when called.
 * @function
 */
export type TokenFactory = () => string | undefined

export type AuthData = {
  tokenFactory?: TokenFactory
  username?: string
}

export type AppConfig = {
  applicationName: string
}
/**
 * Shape for Application config module
 */
export type AppConfigModule = {
  AppConfig: AppConfig
}

/**
 * Subscription is received generally after making WebSocket Stream Request
 * @interface
 */
export interface Subscription {
  cancel: () => void
}

export type LocationServiceError = {
  _type: 'LocationServiceError'
  reason: string
}
