import type {
  ConfigFileInfo,
  ConfigFileRevision,
  ConfigId,
  ConfigMetadata,
  ConfigService,
  FileType,
  Option,
  TokenFactory
} from '../..'
import { ConfigFileInfosD, ConfigIdD, ConfigMetadataD } from '../../decoders/ConfigDecoders'
import { HeaderExt } from '../../utils/HeaderExt'
import { del, get, post, put, RequestResponse } from '../../utils/Http'
import * as ConfigUtils from './ConfigUtils'
import { tryGetConfigBlob } from './ConfigUtils'
import type { ConfigData } from './models/ConfigData'

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

  getById(confPath: string, configId: ConfigId): Promise<Option<ConfigData>> {
    const url = this.endpoint(`config/${confPath}?id=${configId.id}`)
    return tryGetConfigBlob(url)
  }

  getByTime(confPath: string, time: Date): Promise<Option<ConfigData>> {
    const url = this.endpoint(`config/${confPath}?date=${time.toISOString()}`)
    return tryGetConfigBlob(url)
  }

  exists(confPath: string, configId?: ConfigId): Promise<boolean> {
    const path = configId ? `${confPath}?id=${configId.id}` : confPath
    const url = this.endpoint(`config/${path}`)
    return ConfigUtils.tryConfigExists(url)
  }

  list(params?: { type?: FileType; pattern?: string }): Promise<ConfigFileInfo[]> {
    const queryParams: Record<string, string> = {}
    if (params?.type) queryParams['type'] = params.type
    if (params?.pattern) queryParams['pattern'] = params.pattern
    const url = this.endpoint('list')
    return get({
      url,
      queryParams,
      decoder: ConfigUtils.decodeUsing(ConfigFileInfosD)
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

  getActiveVersion(path: string): Promise<Option<ConfigId>> {
    const url = this.endpoint(`active-version/${path}`)
    return ConfigUtils.tryGetActiveVersion(url)
  }

  getMetadata(): Promise<ConfigMetadata> {
    const url = this.endpoint('metadata')
    return get({ url, decoder: ConfigUtils.decodeUsing(ConfigMetadataD) })
  }

  history(path: string, from: Date, to: Date, maxResults: number): Promise<ConfigFileRevision[]> {
    const url = this.endpoint(`history/${path}`)
    return ConfigUtils.history(url, from, to, maxResults)
  }

  historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<ConfigFileRevision[]> {
    const url = this.endpoint(`history-active/${path}`)
    return ConfigUtils.history(url, from, to, maxResults)
  }

  resetActiveVersion(path: string, comment: string): Promise<void> {
    const url = this.endpoint(`active-version/${path}`)
    const headers = this.getAuthHeader()
    return put({ url, headers, queryParams: { comment } })
  }

  setActiveVersion(path: string, configId: ConfigId, comment: string): Promise<void> {
    const url = this.endpoint(`active-version/${path}`)
    const headers = this.getAuthHeader()
    return put({ url, headers, queryParams: { id: configId.id, comment } })
  }

  delete(path: string, comment: string): Promise<void> {
    const url = this.endpoint(`config/${path}`)
    const headers = this.getAuthHeader()

    return del({ url, headers, queryParams: { comment } })
  }

  create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<ConfigId> {
    return this.createOrUpdate(
      path,
      configData.toBlob(),
      { annex: annex.toString(), comment },
      post
    )
  }

  update(path: string, configData: ConfigData, comment: string): Promise<ConfigId> {
    return this.createOrUpdate(path, configData.toBlob(), { comment }, put)
  }

  private createOrUpdate(
    path: string,
    payload: Blob,
    queryParams: Record<string, string>,
    fetchReq: RequestResponse
  ): Promise<ConfigId> {
    ConfigUtils.validatePath(path)
    const url = this.endpoint(`config/${path}`)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const decoder = ConfigUtils.decodeUsing(ConfigIdD)
    return fetchReq({ url, headers, queryParams, payload, decoder })
  }
}
