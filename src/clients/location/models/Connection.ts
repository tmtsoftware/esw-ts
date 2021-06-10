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
export type ConnectionType = 'akka' | 'tcp' | 'http'
/**
 * @category Location Service
 */
export type AkkaConnection = {
  connectionType: 'akka'
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
export type Connection = AkkaConnection | HttpConnection | TcpConnection
/**
 * A helper function to create Akka Connection
 * @category Location Service
 */
export const AkkaConnection: (prefix: Prefix, componentType: ComponentType) => AkkaConnection =
  mkConnection('akka')
/**
 * A helper function to create Http Connection
 * @category Location Service
 */
export const HttpConnection: (prefix: Prefix, componentType: ComponentType) => HttpConnection =
  mkConnection('http')
/**
 * A helper function to create TCP Connection
 * @category Location Service
 */
export const TcpConnection: (prefix: Prefix, componentType: ComponentType) => TcpConnection =
  mkConnection('tcp')
