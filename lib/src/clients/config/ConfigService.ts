import { TokenFactory } from '../..'
import { Option } from '../../utils/types'
import { ConfigServiceImpl } from './ConfigServiceImpl'
import { resolveConfigServer } from './ConfigUtils'
import { ConfigData } from './models/ConfigData'
import * as M from './models/ConfigModels'

export interface ConfigService {
  create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<M.ConfigId>

  update(path: string, configData: ConfigData, comment: string): Promise<M.ConfigId>

  getActive(path: string): Promise<Option<ConfigData>>

  getLatest(path: string): Promise<Option<ConfigData>>

  getById(path: string, configId: M.ConfigId): Promise<Option<ConfigData>>

  getByTime(path: string, time: Date): Promise<Option<ConfigData>>

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

  getActiveByTime(path: string, time: Date): Promise<Option<ConfigData>>

  getActiveVersion(path: string): Promise<Option<M.ConfigId>>

  getMetadata(): Promise<M.ConfigMetadata>
}

export const ConfigService = async (tokenFactory: TokenFactory): Promise<ConfigService> => {
  const { host, port } = await resolveConfigServer()
  return new ConfigServiceImpl(host, port, tokenFactory)
}
