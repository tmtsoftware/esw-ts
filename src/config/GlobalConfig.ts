/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

const CONFIG_PATH = '/config.js'
/**
 * Represents the shape of configuration Module `config.js`.
 * @Category Configuration
 */
export type ConfigModule = { config: Config }
/**
 * Represents the shape of configuration properties `ConfigModule`.
 * @Category Configuration
 */
export type Config = {
  /**
   * @description the url of the location server that will be used by LocationService client factory.
   * @default http://localhost:7654
   */
  locationUrl: string
  /**
   * @description the default value for taiTime Offset. Make sure, This is set to same value which is set in CSW's time service.
   * @default 37
   */
  taiOffset: number
}

export type LocationInfo = {
  host: string
  port: number
}

const DefaultConfig: Config = { locationUrl: 'http://localhost:7654', taiOffset: 37 }

/**
 * Application wide Global Variable to keep TMT Application related configuration.
 * This variable is solely responsible for providing frontend configurations across all the TMT applications.
 * Note: This variable need to be set on application load time using `loadGlobalConfig()`
 */
// eslint-disable-next-line import/no-mutable-exports
export let GlobalConfig: Config = DefaultConfig

const loadConfig = async (): Promise<Config> => {
  const module = <ConfigModule>await import(/* @vite-ignore */ CONFIG_PATH)
  return module.config
}
/**
 * This function loads the required Configuration from the static server's root level file named 'config.js'.
 * This configuration is currently used to set Global Configurations which will be used by all TMT Applications.
 * In Production, this method expects `config.js` file to be present containing `ConfigModule`.
 * @Category Configuration
 */
export const loadGlobalConfig = async () => {
  GlobalConfig = process.env.NODE_ENV === 'production' ? await loadConfig() : DefaultConfig
  console.log('Config loaded successfully in', process.env.NODE_ENV, 'mode')
  console.log(GlobalConfig)
}
