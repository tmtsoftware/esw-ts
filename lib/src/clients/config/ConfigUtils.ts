import { Decoder } from 'io-ts/es6/Decoder'
import * as D from 'io-ts/lib/Decoder'
import { GenericError } from '../../utils/GenericError'
import { get, head } from '../../utils/Http'
import type { Option } from '../../utils/types'
import { getOrThrow } from '../../utils/Utils'
import { ConfigData } from './models/ConfigData'
import * as M from './models/ConfigModels'

export const decodeUsing = <T>(decoder: Decoder<unknown, T>) => (obj: unknown) =>
  getOrThrow(decoder.decode(obj))

export const tryGetConfigBlob = async (url: string): Promise<Option<ConfigData>> => {
  const mayBeConfigData = await map404(get({ url, responseMapper: (res) => res.blob() }), undefined)
  return mayBeConfigData ? ConfigData.from(mayBeConfigData) : mayBeConfigData
}

export const tryConfigExists = async (url: string): Promise<boolean> =>
  map404(
    head({ url, decoder: decodeUsing(D.string) }).then(() => true),
    false
  )

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
    decoder: decodeUsing(D.array(M.ConfigFileRevisionD))
  })

const map404 = async <T, U>(response: Promise<T>, on404: U) => {
  try {
    return await response
  } catch (e) {
    if (e instanceof GenericError && e.status === 404) return on404
    throw e
  }
}
