import { Decoder } from 'io-ts/es6/Decoder'
import { extractHostPort, getOrThrow } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { configConnection } from '../../config/connections'
import { get, head } from '../../utils/Http'
import { GenericError } from '../../utils/GenericError'
import * as D from 'io-ts/lib/Decoder'
import * as M from './models/ConfigModels'

export const decodeUsing = <T>(decoder: Decoder<unknown, T>) => {
  return (obj: unknown) => getOrThrow(decoder.decode(obj))
}

export const endpoint = async (path: string) => {
  const { host, port } = await resolveConfigServer()
  return `http://${host}:${port}/${path}`
}

export const resolveConfigServer = async () => {
  const location = await resolve(configConnection)
  return extractHostPort(location.uri)
}

export const configEndpoint = (path: string) => {
  return endpoint(`config/${path}`)
}

export const activeConfigEndpoint = (path: string) => {
  return endpoint(`active-config/${path}`)
}

export const activeVersionEndpoint = (path: string) => {
  return endpoint(`active-version/${path}`)
}

export const tryGetConfigBlob = async (url: string) => {
  try {
    return await get({ url, responseMapper: (res) => res.blob() })
  } catch (e) {
    if (e instanceof GenericError) {
      if (e.status === 404) return undefined
    }
    throw e
  }
}

export const tryConfigExists = async (path: string): Promise<boolean> => {
  const url = await configEndpoint(path)
  try {
    await head({ url, decoder: decodeUsing(D.string) })
    return true
  } catch (e) {
    if (e instanceof GenericError) {
      if (e.status === 404) return false
    }
    throw e
  }
}

export const tryGetActiveVersion = async (url: string) => {
  try {
    return await get({ url, decoder: decodeUsing(M.ConfigIdD) })
  } catch (e) {
    if (e instanceof GenericError) {
      if (e.status === 404) return undefined
    }
    throw e
  }
}
