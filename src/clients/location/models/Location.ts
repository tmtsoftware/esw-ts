import type { Connection } from './Connection'

/**
 * Represents a live Akka connection of a component
 * @category Location Service
 */
export type AkkaLocation = {
  _type: 'AkkaLocation'
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
export type Location = AkkaLocation | TcpLocation | HttpLocation
