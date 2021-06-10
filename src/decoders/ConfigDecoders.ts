import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import {
  ConfigFileInfo,
  ConfigFileRevision,
  ConfigId,
  ConfigMetadata,
  FileType
} from '../clients/config-service'
import { ciLiteral, Decoder } from './Decoder'

export const FileTypeD: Decoder<FileType> = ciLiteral('Normal', 'Annex')

export const ConfigIdD: Decoder<ConfigId> = pipe(
  D.string,
  D.parse((name) => D.success(new ConfigId(name)))
)

export const ConfigFileInfoD: Decoder<ConfigFileInfo> = D.struct({
  path: D.string,
  id: ConfigIdD,
  author: D.string,
  comment: D.string
})

export const ConfigFileInfosD: Decoder<ConfigFileInfo[]> = D.array(ConfigFileInfoD)

export const ConfigFileRevisionD: Decoder<ConfigFileRevision> = D.struct({
  id: ConfigIdD,
  author: D.string,
  comment: D.string,
  time: D.string
})

export const ConfigFileRevisionsD: Decoder<ConfigFileRevision[]> = D.array(ConfigFileRevisionD)

export const ConfigMetadataD: Decoder<ConfigMetadata> = D.struct({
  repoPath: D.string,
  annexPath: D.string,
  annexMinFileSize: D.string,
  maxConfigFileSize: D.string
})
