import type { ConfigFileRevision, Option } from '../..'
import { ServiceError } from '../..'
import { StringD } from '../../decoders/CommonDecoders'
import { ConfigFileRevisionsD, ConfigIdD } from '../../decoders/ConfigDecoders'
import type { Decoder } from '../../decoders/Decoder'
import { get, head } from '../../utils/Http'
import { getOrThrow } from '../../utils/Utils'
import { ConfigData } from './models/ConfigData'

export const decodeUsing =
  <T>(decoder: Decoder<T>) =>
  (obj: unknown) =>
    getOrThrow(decoder.decode(obj))

export const tryGetConfigBlob = async (url: string): Promise<Option<ConfigData>> => {
  const mayBeConfigData = await map404(get({ url, responseMapper: (res) => res.blob() }), undefined)
  return mayBeConfigData ? ConfigData.from(mayBeConfigData) : mayBeConfigData
}

export const tryConfigExists = async (url: string): Promise<boolean> =>
  map404(
    head({ url, decoder: decodeUsing(StringD) }).then(() => true),
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
    decoder: decodeUsing(ConfigFileRevisionsD)
  })

const map404 = async <T, U>(response: Promise<T>, on404: U) => {
  try {
    return await response
  } catch (e) {
    if (e instanceof ServiceError && e.status === 404) return on404
    throw e
  }
}

export const validatePath = (path: string) => {
  const invalidChars = "!#<>$%&'@^`~+,;=\\s"
  const invalidPattern = new RegExp(`[${invalidChars}]`)
  if (invalidPattern.test(path)) {
    const charsMessage = invalidChars.replace('\\s', '')
    throw new Error(
      `Input file path '${path}' contains invalid characters. Note, these characters ${charsMessage} or 'white space' are not allowed in file path`
    )
  }
}
