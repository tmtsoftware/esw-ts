import { TokenFactory } from '../..'
import { Option } from '../../utils/Option'
import { resolveConfigServer } from './ConfigUtils'
import * as M from './models/ConfigModels'
import { ConfigServiceImpl } from './Impl'

export interface ConfigService {
  create(path: string, configData: Blob, annex: boolean, comment: string): Promise<M.ConfigId>

  update(path: string, configData: Blob, comment: string): Promise<M.ConfigId>

  getActive(path: string): Promise<Option<Blob>>

  getLatest(path: string): Promise<Option<Blob>>

  getById(path: string, configId: M.ConfigId): Promise<Option<Blob>>

  getByTime(path: string, time: Date): Promise<Option<Blob>>

  exists(path: string, id?: M.ConfigId): Promise<boolean>

  delete(path: string, comment: string): Promise<void>

  list(fileType?: M.FileType, pattern?: string): Promise<M.ConfigFileInfo[]>

  history(path: string, from: Date, to: Date, maxResults: number): Promise<M.ConfigFileRevision[]>

  historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]>

  setActiveVersion(path: string, id: M.ConfigId, comment: string): Promise<void>

  resetActiveVersion(path: string, comment: string): Promise<void>

  getActiveByTime(path: string, time: Date): Promise<Option<Blob>>

  getActiveVersion(path: string): Promise<Option<M.ConfigId>>

  getMetadata(): Promise<M.ConfigMetadata>
}
export const ConfigService = async (tokenFactory: TokenFactory): Promise<ConfigService> => {
  const { host, port } = await resolveConfigServer()
  return new ConfigServiceImpl(host, port, tokenFactory)
}
