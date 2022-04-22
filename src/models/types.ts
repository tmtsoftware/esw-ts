/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * A function which returns valid auth token
 * @function
 */
export type TokenFactory = () => string | undefined

export type AuthData = {
  /**
   * a function that returns a valid auth token which has correct access roles and permissions
   */
  tokenFactory?: TokenFactory

  /**
   * username of the logged in user
   */
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
