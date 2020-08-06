import { Decoder } from 'io-ts/es6/Decoder'
import * as D from 'io-ts/lib/Decoder'
import { configConnection } from '../../config/connections'
import { GenericError } from '../../utils/GenericError'
import { get, head } from '../../utils/Http'
import { extractHostPort, getOrThrow } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import * as M from './models/ConfigModels'

export const decodeUsing = <T>(decoder: Decoder<unknown, T>) => (obj: unknown) =>
  getOrThrow(decoder.decode(obj))

export const endpoint = async (path: string) => {
  const { host, port } = await resolveConfigServer()
  return `http://${host}:${port}/${path}`
}

export const resolveConfigServer = async () => {
  const location = await resolve(configConnection)
  return extractHostPort(location.uri)
}

export const configEndpoint = (path: string) => endpoint(`config/${path}`)
export const activeConfigEndpoint = (path: string) => endpoint(`active-config/${path}`)
export const activeVersionEndpoint = (path: string) => endpoint(`active-version/${path}`)

export const tryGetConfigBlob = (url: string) =>
  map404(get({ url, responseMapper: (res) => res.blob() }), undefined)

export const tryConfigExists = async (path: string): Promise<boolean> => {
  const url = await configEndpoint(path)
  return map404(
    head({ url, decoder: decodeUsing(D.string) }).then(() => true),
    false
  )
}

export const tryGetActiveVersion = async (url: string) =>
  map404(get({ url, decoder: decodeUsing(M.ConfigIdD) }), undefined)

const map404 = async <T, U>(response: Promise<T>, on404: U) => {
  try {
    return await response
  } catch (e) {
    if (e instanceof GenericError && e.status === 404) return on404
    throw e
  }
}
