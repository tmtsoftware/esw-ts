/**
 * @category Config Service
 */
export class ConfigId {
  constructor(readonly id: string) {}

  toJSON() {
    return this.id
  }
}

/**
 * @category Config Service
 */
export type ConfigFileInfo = {
  path: string
  id: ConfigId
  author: string
  comment: string
}
/**
 * @category Config Service
 */
export type ConfigFileRevision = {
  id: ConfigId
  author: string
  comment: string
  time: string
}
/**
 * @category Config Service
 */
export type ConfigMetadata = {
  repoPath: string
  annexPath: string
  annexMinFileSize: string
  maxConfigFileSize: string
}
/**
 * @category Config Service
 */
export type FileType = 'Normal' | 'Annex'
