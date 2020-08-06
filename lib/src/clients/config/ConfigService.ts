import * as D from 'io-ts/lib/Decoder'
import { HeaderExt } from '../../utils/HeaderExt'
import { del, get, post, put } from '../../utils/Http'
import * as M from './models/ConfigModels'
import { TokenFactory } from '../..'
import * as ConfigUtils from './ConfigUtils'
import { configEndpoint, tryGetConfigBlob } from './ConfigUtils'
import { Option } from '../../utils/Option'

export interface ConfigServiceApi {
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

export class ConfigService implements ConfigServiceApi {
  constructor(readonly tokenFactory: TokenFactory) {}

  getAuthHeader(): HeaderExt {
    return new HeaderExt().withAuthorization(this.tokenFactory())
  }

  async getLatest(confPath: string): Promise<Option<Blob>> {
    const url = await configEndpoint(confPath)
    return await tryGetConfigBlob(url)
  }

  async getById(confPath: string, configId: M.ConfigId): Promise<Option<Blob>> {
    const url = await configEndpoint(`${confPath}?id=${configId.id}`)
    return await tryGetConfigBlob(url)
  }

  async getByTime(confPath: string, time: Date): Promise<Option<Blob>> {
    const url = await configEndpoint(`${confPath}?date=${time.toISOString()}`)
    return await tryGetConfigBlob(url)
  }

  exists(confPath: string, configId?: M.ConfigId): Promise<boolean> {
    const path = configId ? `${confPath}?id=${configId.id}` : confPath
    return ConfigUtils.tryConfigExists(path)
  }

  async list(type?: M.FileType, pattern?: string): Promise<M.ConfigFileInfo[]> {
    const queryParams: Record<string, string> = {}
    if (type) queryParams['type'] = type
    if (pattern) queryParams['pattern'] = pattern
    const url = await ConfigUtils.endpoint('list')
    return await get({
      url,
      queryParams,
      decoder: ConfigUtils.decodeUsing(D.array(M.ConfigFileInfo))
    })
  }

  async getActive(confPath: string): Promise<Option<Blob>> {
    const url = await ConfigUtils.activeConfigEndpoint(confPath)
    return await ConfigUtils.tryGetConfigBlob(url)
  }

  async getActiveByTime(confPath: string, time: Date): Promise<Option<Blob>> {
    const url = await ConfigUtils.activeConfigEndpoint(`${confPath}?date=${time.toISOString()}`)
    return await ConfigUtils.tryGetConfigBlob(url)
  }

  async getActiveVersion(path: string): Promise<Option<M.ConfigId>> {
    const url = await ConfigUtils.activeVersionEndpoint(path)
    return ConfigUtils.tryGetActiveVersion(url)
  }

  async getMetadata(): Promise<M.ConfigMetadata> {
    const url = await ConfigUtils.endpoint('metadata')
    return await get({ url, decoder: ConfigUtils.decodeUsing(M.ConfigMetadata) })
  }

  async history(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]> {
    const url = await ConfigUtils.endpoint(`history/${path}`)
    return await get({
      url,
      queryParams: {
        from: from.toISOString(),
        to: to.toISOString(),
        maxResults: maxResults.toString()
      },
      decoder: ConfigUtils.decodeUsing(D.array(M.ConfigFileRevision))
    })
  }

  async historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]> {
    const url = await ConfigUtils.endpoint(`history-active/${path}`)
    return await get({
      url,
      queryParams: {
        from: from.toISOString(),
        to: to.toISOString(),
        maxResults: maxResults.toString()
      },
      decoder: ConfigUtils.decodeUsing(D.array(M.ConfigFileRevision))
    })
  }

  async resetActiveVersion(path: string, comment: string): Promise<void> {
    const url = await ConfigUtils.activeVersionEndpoint(path)
    const headers = this.getAuthHeader()
    return await put({ url, headers, queryParams: { comment } })
  }

  async setActiveVersion(path: string, configId: M.ConfigId, comment: string): Promise<void> {
    const url = await ConfigUtils.activeVersionEndpoint(path)
    const headers = this.getAuthHeader()
    return await put({ url, headers, queryParams: { id: configId.id, comment } })
  }

  async delete(path: string, comment: string): Promise<void> {
    const url = await ConfigUtils.configEndpoint(path)
    const headers = this.getAuthHeader()

    return del({ url, headers, queryParams: { comment } })
  }

  async create(
    path: string,
    configData: Blob,
    annex: boolean,
    comment: string
  ): Promise<M.ConfigId> {
    const url = await ConfigUtils.configEndpoint(path)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const parameters = { annex: annex.toString(), comment }
    return await post({
      url,
      headers,
      queryParams: parameters,
      payload: configData,
      decoder: ConfigUtils.decodeUsing(M.ConfigIdD)
    })
  }

  async update(path: string, configData: Blob, comment: string): Promise<M.ConfigId> {
    const url = await ConfigUtils.configEndpoint(path)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const parameters = { comment }
    return await put({
      url,
      headers,
      queryParams: parameters,
      payload: configData,
      decoder: ConfigUtils.decodeUsing(M.ConfigIdD)
    })
  }
}
