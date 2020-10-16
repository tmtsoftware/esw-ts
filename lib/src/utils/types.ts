export type Option<T> = T | undefined
/**
 * A function which return valid AAS token when called.
 * @function
 */
export type TokenFactory = () => string | undefined

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
