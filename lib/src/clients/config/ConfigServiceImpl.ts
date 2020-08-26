import * as D from 'io-ts/lib/Decoder'
import { ConfigService, TokenFactory } from '../..'
import { HeaderExt } from '../../utils/HeaderExt'
import { del, get, post, put, RequestResponse } from '../../utils/Http'
import type { Option } from '../../utils/types'
import * as ConfigUtils from './ConfigUtils'
import { tryGetConfigBlob } from './ConfigUtils'
import { ConfigData } from './models/ConfigData'
import * as M from './models/ConfigModels'

export class ConfigServiceImpl implements ConfigService {
  constructor(
    private readonly host: string,
    private readonly port: number,
    readonly tokenFactory: TokenFactory
  ) {}

  getAuthHeader(): HeaderExt {
    return new HeaderExt().withAuthorization(this.tokenFactory())
  }

  private endpoint(path: string) {
    return `http://${this.host}:${this.port}/${path}`
  }

  getLatest(confPath: string): Promise<Option<ConfigData>> {
    const url = this.endpoint(`config/${confPath}`)
    return tryGetConfigBlob(url)
  }

  getById(confPath: string, configId: M.ConfigId): Promise<Option<ConfigData>> {
    const url = this.endpoint(`config/${confPath}?id=${configId.id}`)
    return tryGetConfigBlob(url)
  }

  getByTime(confPath: string, time: Date): Promise<Option<ConfigData>> {
    const url = this.endpoint(`config/${confPath}?date=${time.toISOString()}`)
    return tryGetConfigBlob(url)
  }

  exists(confPath: string, configId?: M.ConfigId): Promise<boolean> {
    const path = configId ? `${confPath}?id=${configId.id}` : confPath
    const url = this.endpoint(`config/${path}`)
    return ConfigUtils.tryConfigExists(url)
  }

  list(type?: M.FileType, pattern?: string): Promise<M.ConfigFileInfo[]> {
    const queryParams: Record<string, string> = {}
    if (type) queryParams['type'] = type
    if (pattern) queryParams['pattern'] = pattern
    const url = this.endpoint('list')
    return get({
      url,
      queryParams,
      decoder: ConfigUtils.decodeUsing(D.array(M.ConfigFileInfoD))
    })
  }

  getActive(confPath: string): Promise<Option<ConfigData>> {
    const url = this.endpoint(`active-config/${confPath}`)
    return ConfigUtils.tryGetConfigBlob(url)
  }

  getActiveByTime(confPath: string, time: Date): Promise<Option<ConfigData>> {
    const url = this.endpoint(`active-config/${confPath}?date=${time.toISOString()}`)
    return ConfigUtils.tryGetConfigBlob(url)
  }

  getActiveVersion(path: string): Promise<Option<M.ConfigId>> {
    const url = this.endpoint(`active-version/${path}`)
    return ConfigUtils.tryGetActiveVersion(url)
  }

  getMetadata(): Promise<M.ConfigMetadata> {
    const url = this.endpoint('metadata')
    return get({ url, decoder: ConfigUtils.decodeUsing(M.ConfigMetadataD) })
  }

  history(path: string, from: Date, to: Date, maxResults: number): Promise<M.ConfigFileRevision[]> {
    const url = this.endpoint(`history/${path}`)
    return ConfigUtils.history(url, from, to, maxResults)
  }

  historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]> {
    const url = this.endpoint(`history-active/${path}`)
    return ConfigUtils.history(url, from, to, maxResults)
  }

  resetActiveVersion(path: string, comment: string): Promise<void> {
    const url = this.endpoint(`active-version/${path}`)
    const headers = this.getAuthHeader()
    return put({ url, headers, queryParams: { comment } })
  }

  setActiveVersion(path: string, configId: M.ConfigId, comment: string): Promise<void> {
    const url = this.endpoint(`active-version/${path}`)
    const headers = this.getAuthHeader()
    return put({ url, headers, queryParams: { id: configId.id, comment } })
  }

  delete(path: string, comment: string): Promise<void> {
    const url = this.endpoint(`config/${path}`)
    const headers = this.getAuthHeader()

    return del({ url, headers, queryParams: { comment } })
  }

  create(
    path: string,
    configData: ConfigData,
    annex: boolean,
    comment: string
  ): Promise<M.ConfigId> {
    return this.createOrUpdate(
      path,
      configData.toBlob(),
      { annex: annex.toString(), comment },
      post
    )
  }

  update(path: string, configData: ConfigData, comment: string): Promise<M.ConfigId> {
    return this.createOrUpdate(path, configData.toBlob(), { comment }, put)
  }

  private createOrUpdate(
    path: string,
    payload: Blob,
    queryParams: Record<string, string>,
    fetchReq: RequestResponse
  ): Promise<M.ConfigId> {
    const url = this.endpoint(`config/${path}`)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const decoder = ConfigUtils.decodeUsing(M.ConfigIdD)
    return fetchReq({ url, headers, queryParams, payload, decoder })
  }
}
