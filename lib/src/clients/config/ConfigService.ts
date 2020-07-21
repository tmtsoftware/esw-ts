import { TokenFactory } from '../..'
import { configConnection } from '../../config/connections'
import { HeaderExt } from '../../utils/HeaderExt'
import { del, get, head, post, put } from '../../utils/Http'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import * as M from './models/ConfigModels'

export interface ConfigServiceApi {
  create(path: string, configData: Blob, annex: boolean, comment: string): Promise<M.ConfigId>

  update(path: string, configData: Blob, comment: string): Promise<M.ConfigId>

  getActive(path: string): Promise<Blob>

  getLatest(path: string): Promise<Blob>

  getById(path: string, configId: M.ConfigId): Promise<Blob>

  getByTime(path: string, time: Date): Promise<Blob>

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

  getActiveByTime(path: string, time: Date): Promise<Blob>

  getActiveVersion(path: string): Promise<M.ConfigId[]>

  getMetadata(): Promise<M.ConfigMetadata>
}

export class ConfigService implements ConfigServiceApi {
  constructor(readonly tokenFactory: TokenFactory) {}

  private static async resolveConfigServer() {
    const location = await resolve(configConnection)
    return extractHostPort(location.uri)
  }

  getAuthHeader(): HeaderExt {
    return new HeaderExt().withAuthorization(this.tokenFactory())
  }

  private static async endpoint(path: string) {
    const { host, port } = await ConfigService.resolveConfigServer()
    return `http://${host}:${port}/${path}`
  }

  private static configEndpoint(path: string) {
    return ConfigService.endpoint(`config/${path}`)
  }

  private static activeConfigEndpoint(path: string) {
    return ConfigService.endpoint(`active-config/${path}`)
  }

  private static activeVersionEndpoint(path: string) {
    return ConfigService.endpoint(`active-version/${path}`)
  }

  private static async getConfigBlob(path: string): Promise<Blob> {
    const url = await ConfigService.configEndpoint(path)
    return await get({ url, responseMapper: (res) => res.blob() })
  }

  private static async getActiveConfigBlob(path: string): Promise<Blob> {
    const url = await ConfigService.activeConfigEndpoint(path)
    return await get({ url, responseMapper: (res) => res.blob() })
  }

  getLatest(confPath: string): Promise<Blob> {
    return ConfigService.getConfigBlob(confPath)
  }

  getById(confPath: string, configId: M.ConfigId): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?id=${configId.id}`)
  }

  getByTime(confPath: string, time: Date): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?date=${time}`)
  }

  async exists(confPath: string, configId?: M.ConfigId): Promise<boolean> {
    const path = configId ? `${confPath}?id=${configId.id}` : confPath
    const url = await ConfigService.configEndpoint(path)
    return await head({ url })
  }

  async list(type?: M.FileType, pattern?: string): Promise<M.ConfigFileInfo[]> {
    const queryParams: Record<string, string> = {}
    if (type) queryParams['type'] = type
    if (pattern) queryParams['pattern'] = pattern
    const url = await ConfigService.configEndpoint('list')
    return await get({ url, queryParams })
  }

  getActive(confPath: string): Promise<Blob> {
    return ConfigService.getActiveConfigBlob(confPath)
  }

  getActiveByTime(confPath: string, time: Date): Promise<Blob> {
    return ConfigService.getActiveConfigBlob(`${confPath}?date=${time}`)
  }

  async getActiveVersion(path: string): Promise<M.ConfigId[]> {
    const url = await ConfigService.activeVersionEndpoint(path)
    return await get({ url })
  }

  async getMetadata(): Promise<M.ConfigMetadata> {
    const url = await ConfigService.endpoint('metadata')
    return await get({ url })
  }

  async history(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]> {
    const url = await ConfigService.endpoint(`history/${path}`)
    return await get({
      url,
      queryParams: {
        from: from.toUTCString(),
        to: to.toUTCString(),
        maxResults: maxResults.toString()
      }
    })
  }

  async historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]> {
    const url = await ConfigService.endpoint(`history-active/${path}`)
    return await get({
      url,
      queryParams: {
        from: from.toUTCString(),
        to: to.toUTCString(),
        maxResults: maxResults.toString()
      }
    })
  }

  async resetActiveVersion(path: string, comment: string): Promise<void> {
    const url = await ConfigService.activeVersionEndpoint(path)
    const headers = this.getAuthHeader()
    return await put({ url, headers, queryParams: { comment } })
  }

  async setActiveVersion(path: string, configId: M.ConfigId, comment: string): Promise<void> {
    const url = await ConfigService.activeVersionEndpoint(path)
    const headers = this.getAuthHeader()
    return await put({ url, headers, queryParams: { id: configId.id, comment } })
  }

  async delete(path: string, comment: string): Promise<void> {
    const url = await ConfigService.configEndpoint(path)
    const headers = this.getAuthHeader()

    return del({ url, headers, queryParams: { comment } })
  }

  async create(
    path: string,
    configData: Blob,
    annex: boolean,
    comment: string
  ): Promise<M.ConfigId> {
    const url = await ConfigService.configEndpoint(path)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const parameters = { annex: annex.toString(), comment }
    return await post({ url, headers, queryParams: parameters, payload: configData })
  }

  async update(path: string, configData: Blob, comment: string): Promise<M.ConfigId> {
    const url = await ConfigService.configEndpoint(path)
    const headers = this.getAuthHeader().withContentType('application/octet-stream')
    const parameters = { comment }
    return await put({ url, headers, queryParams: parameters, payload: configData })
  }
}
