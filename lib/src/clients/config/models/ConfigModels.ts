import * as D from 'io-ts/lib/Decoder'
import { pipe } from 'fp-ts/lib/pipeable'
import { ciLiteral } from '../../../utils/Decoder'

export const FileType = ciLiteral('Normal', 'Annex')
export type FileType = D.TypeOf<typeof FileType>

export class ConfigId {
  constructor(readonly id: string) {}

  toJSON() {
    return this.id
  }
}

export const ConfigIdD = pipe(
  D.string,
  D.parse((name) => D.success(new ConfigId(name)))
)

export type ConfigFileInfo = D.TypeOf<typeof ConfigFileInfo>
export const ConfigFileInfo = D.type({
  path: D.string,
  id: ConfigIdD,
  author: D.string,
  comment: D.string
})

export type ConfigFileRevision = D.TypeOf<typeof ConfigFileRevision>
export const ConfigFileRevision = D.type({
  id: ConfigIdD,
  author: D.string,
  comment: D.string,
  time: D.string
})

export type ConfigMetadata = D.TypeOf<typeof ConfigMetadata>
export const ConfigMetadata = D.type({
  repoPath: D.string,
  annexPath: D.string,
  annexMinFileSize: D.string,
  maxConfigFileSize: D.string
})
