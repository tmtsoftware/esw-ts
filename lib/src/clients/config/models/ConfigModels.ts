import { pipe } from 'fp-ts/lib/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

// ##################### Decoders #####################
export const FileTypeD = ciLiteral('Normal', 'Annex')

export const ConfigIdD = pipe(
  D.string,
  D.parse((name) => D.success(new ConfigId(name)))
)

export const ConfigFileInfoD = D.type({
  path: D.string,
  id: ConfigIdD,
  author: D.string,
  comment: D.string
})

export const ConfigFileRevisionD = D.type({
  id: ConfigIdD,
  author: D.string,
  comment: D.string,
  time: D.string
})

export const ConfigMetadataD = D.type({
  repoPath: D.string,
  annexPath: D.string,
  annexMinFileSize: D.string,
  maxConfigFileSize: D.string
})

// ######################################################

export type FileType = D.TypeOf<typeof FileTypeD>
export class ConfigId {
  constructor(readonly id: string) {}

  toJSON() {
    return this.id
  }
}
export type ConfigFileInfo = D.TypeOf<typeof ConfigFileInfoD>
export type ConfigFileRevision = D.TypeOf<typeof ConfigFileRevisionD>
export type ConfigMetadata = D.TypeOf<typeof ConfigMetadataD>
