import { Decoder } from 'io-ts/es6/Decoder'
import * as D from 'io-ts/lib/Decoder'
import { configConnection } from '../../config/connections'
import { GenericError } from '../../utils/GenericError'
import { get, head } from '../../utils/Http'
import { extractHostPort, getOrThrow } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import * as M from './models/ConfigModels'
import { ConfigData } from './models/ConfigData'

export const decodeUsing = <T>(decoder: Decoder<unknown, T>) => (obj: unknown) =>
  getOrThrow(decoder.decode(obj))

export const resolveConfigServer = async () => {
  const location = await resolve(configConnection)
  return extractHostPort(location.uri)
}
export const tryGetConfigBlob = (url: string) =>
  map404(get({ url, responseMapper: async (res) => ConfigData.from(await res.blob()) }), undefined)

export const tryConfigExists = async (url: string): Promise<boolean> => {
  return map404(
    head({ url, decoder: decodeUsing(D.string) }).then(() => true),
    false
  )
}

export const tryGetActiveVersion = async (url: string) =>
  map404(get({ url, decoder: decodeUsing(M.ConfigIdD) }), undefined)

export const history = async (
  path: string,
  from: Date,
  to: Date,
  maxResults: number
): Promise<M.ConfigFileRevision[]> =>
  get({
    url: path,
    queryParams: {
      from: from.toISOString(),
      to: to.toISOString(),
      maxResults: maxResults.toString()
    },
    decoder: decodeUsing(D.array(M.ConfigFileRevision))
  })

const map404 = async <T, U>(response: Promise<T>, on404: U) => {
  try {
    return await response
  } catch (e) {
    if (e instanceof GenericError && e.status === 404) return on404
    throw e
  }
}
