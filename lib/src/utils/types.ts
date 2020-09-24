export type Option<T> = T | undefined

export type TokenFactory = () => string | undefined

export type AppConfig = {
  applicationName: string
}

export type AppConfigModule = {
  AppConfig: AppConfig
}

export interface Subscription {
  cancel: () => void
}
