import type * as D from 'io-ts/lib/Decoder'
import type { FileTypeD } from '../../../decoders/ConfigDecoders'

export class ConfigId {
  constructor(readonly id: string) {}

  toJSON() {
    return this.id
  }
}

export type ConfigFileInfo = {
  path: string
  id: ConfigId
  author: string
  comment: string
}

export type ConfigFileRevision = {
  id: ConfigId
  author: string
  comment: string
  time: string
}

export type ConfigMetadata = {
  repoPath: string
  annexPath: string
  annexMinFileSize: string
  maxConfigFileSize: string
}
export type FileType = D.TypeOf<typeof FileTypeD>
