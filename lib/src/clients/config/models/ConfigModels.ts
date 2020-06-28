export type ConfigData = string
export type FileType = 'Normal' | 'Annex'

export interface ConfigId {
  id: string
}

export interface ConfigFileInfo {
  path: string
  id: ConfigId
  author: string
  comment: string
}

export interface ConfigFileRevision {
  id: ConfigId
  author: string
  comment: string
  time: Date
}

export interface ConfigMetadata {
  repoPath: string
  annexPath: string
  annexMinFileSize: string
  maxConfigFileSize: string
}
