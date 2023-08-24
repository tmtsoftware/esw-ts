/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Connection } from './Connection'

/**
 * Represents a live Pekko connection of a component
 * @category Location Service
 */
export type PekkoLocation = {
  _type: 'PekkoLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * Represents a live HTTP connection of a component
 * @category Location Service
 */
export type HttpLocation = {
  _type: 'HttpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * Represents a live Tcp connection of a component
 * @category Location Service
 */
export type TcpLocation = {
  _type: 'TcpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * Location represents a live Connection along with its URI
 * @category Location Service
 */
export type Location = PekkoLocation | TcpLocation | HttpLocation
