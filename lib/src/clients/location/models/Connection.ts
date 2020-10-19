import type { ComponentType, Prefix } from '../../../models'

const mkConnection = <T extends ConnectionType>(connectionType: T) => (
  prefix: Prefix,
  componentType: ComponentType
) => ({ connectionType, prefix, componentType })
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
 * @category Location Service
 */
export const AkkaConnection = mkConnection('akka')
/**
 * @category Location Service
 */
export const HttpConnection = mkConnection('http')
/**
 * @category Location Service
 */
export const TcpConnection = mkConnection('tcp')
