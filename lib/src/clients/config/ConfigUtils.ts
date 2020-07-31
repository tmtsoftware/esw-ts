import { Decoder } from 'io-ts/es6/Decoder'
import { extractHostPort, getOrThrow } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { configConnection } from '../../config/connections'
import { get } from '../../utils/Http'

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

export const getConfigBlob = async (path: string): Promise<Blob> => {
  const url = await configEndpoint(path)
  return await get({ url, responseMapper: (res) => res.blob() })
}

export const getActiveConfigBlob = async (path: string): Promise<Blob> => {
  const url = await activeConfigEndpoint(path)
  return await get({ url, responseMapper: (res) => res.blob() })
}
