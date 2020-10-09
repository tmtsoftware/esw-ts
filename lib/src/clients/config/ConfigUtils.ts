import type { Decoder } from 'io-ts/es6/Decoder'
import * as D from 'io-ts/lib/Decoder'
import type { ConfigFileRevision, Option } from '../..'
import { ConfigFileRevisionD, ConfigIdD } from '../../decoders/ConfigDecoders'
import { GenericError } from '../../utils/GenericError'
import { get, head } from '../../utils/Http'
import { getOrThrow } from '../../utils/Utils'
import { ConfigData } from './models/ConfigData'

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
  map404(get({ url, decoder: decodeUsing(ConfigIdD) }), undefined)

export const history = async (
  path: string,
  from: Date,
  to: Date,
  maxResults: number
): Promise<ConfigFileRevision[]> =>
  get({
    url: path,
    queryParams: {
      from: from.toISOString(),
      to: to.toISOString(),
      maxResults: maxResults.toString()
    },
    decoder: decodeUsing(D.array(ConfigFileRevisionD))
  })

const map404 = async <T, U>(response: Promise<T>, on404: U) => {
  try {
    return await response
  } catch (e) {
    if (e instanceof GenericError && e.status === 404) return on404
    throw e
  }
}
