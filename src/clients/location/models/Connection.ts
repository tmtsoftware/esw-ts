/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentType, Prefix } from '../../../models'

/**
 * @internal
 */
const mkConnection =
  <T extends ConnectionType>(connectionType: T) =>
  (prefix: Prefix, componentType: ComponentType) => ({ connectionType, prefix, componentType })
/**
 * @category Location Service
 */
export type ConnectionType = 'pekko' | 'tcp' | 'http'
/**
 * @category Location Service
 */
export type PekkoConnection = {
  connectionType: 'pekko'
  prefix: Prefix
  componentType: ComponentType
}
/**
 * @category Location Service
 */
export type HttpConnection = {
  connectionType: 'http'
  prefix: Prefix
  componentType: ComponentType
}
/**
 * @category Location Service
 */
export type TcpConnection = {
  connectionType: 'tcp'
  prefix: Prefix
  componentType: ComponentType
}
/**
 * @category Location Service
 */
export type Connection = PekkoConnection | HttpConnection | TcpConnection
/**
 * A helper function to create Pekko Connection
 * @category Location Service
 */
export const PekkoConnection: (prefix: Prefix, componentType: ComponentType) => PekkoConnection = mkConnection('pekko')
/**
 * A helper function to create Http Connection
 * @category Location Service
 */
export const HttpConnection: (prefix: Prefix, componentType: ComponentType) => HttpConnection = mkConnection('http')
/**
 * A helper function to create TCP Connection
 * @category Location Service
 */
export const TcpConnection: (prefix: Prefix, componentType: ComponentType) => TcpConnection = mkConnection('tcp')
