import type { Connection } from './Connection'
/**
 * @category Location Service
 */
export type AkkaLocation = {
  _type: 'AkkaLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * @category Location Service
 */
export type HttpLocation = {
  _type: 'HttpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * @category Location Service
 */
export type TcpLocation = {
  _type: 'TcpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
/**
 * @category Location Service
 */
export type Location = AkkaLocation | TcpLocation | HttpLocation
