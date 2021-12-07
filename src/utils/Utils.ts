import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'
import { SubsystemD } from '../decoders/SubsystemDecoder'
import type { Option, Subsystem } from '../models'

export const requirement = (assertion: boolean, msg: string) => {
  if (!assertion) throw Error(`Requirement failed - ${msg}`)
}

export const extractHostPort = (uri: string) => {
  const [host, _port] = uri.split('/')[2].split(':')
  const port = parseInt(_port)
  return { host, port }
}

export const headOption = <T>(arr: T[]): Option<T> => (arr.length > 0 ? arr[0] : undefined)

export const getOrThrow = <A>(e: E.Either<D.DecodeError, A>): A =>
  E.getOrElse<D.DecodeError, A>((err) => {
    throw Error(D.draw(err))
  })(e)

export const getPostEndPoint = (uri: { port: number; host: string }): string =>
  uri.port ? `http://${uri.host}:${uri.port}/post-endpoint` : `http://${uri.host}/post-endpoint`

export const getWebSocketEndPoint = (uri: { port: number; host: string }): string =>
  uri.port ? `ws://${uri.host}:${uri.port}/websocket-endpoint` : `ws://${uri.host}/websocket-endpoint`

export const parseSubsystemStr = (subsystem: string): Subsystem => {
  const s = SubsystemD.decode(subsystem)
  if (E.isLeft(s)) throw Error(`Subsystem: ${subsystem} is invalid`)
  return s.right
}

export const splitSubsystemComponentName = (prefixStr: string, separator: string) => {
  const stringParts = prefixStr.split(separator)
  const sub = stringParts[0]
  const componentName = stringParts.slice(1).join(separator)
  return [sub, componentName]
}
