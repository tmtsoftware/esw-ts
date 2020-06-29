import { get, head } from '../../utils/Http'
import { TokenFactory } from '../../utils/TokenFactory'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { ConfigFileInfo, ConfigId, ConfigMetadata, FileType } from './models/ConfigModels'
import { configConnection } from '../../config/connections'

export interface ConfigServiceApi {
  // create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<ConfigId>
  //
  // update(path: string, configData: ConfigData, comment: string): Promise<ConfigId>
  //
  getActive(path: string): Promise<Blob>

  getLatest(path: string): Promise<Blob>

  getById(path: string, configId: ConfigId): Promise<Blob>

  getByTime(path: string, time: Date): Promise<Blob>

  exists(path: string, id?: ConfigId): Promise<boolean>

  // delete(path: string, comment: string): Promise<void>

  list(fileType?: FileType, pattern?: string): Promise<ConfigFileInfo[]>

  // history(path: string, from: Date, to: Date, maxResults: number): Promise<ConfigFileRevision[]>
  //
  // historyActive(
  //   path: string,
  //   from: Date,
  //   to: Date,
  //   maxResults: number
  // ): Promise<ConfigFileRevision[]>
  //
  // setActiveVersion(path: string, id: ConfigId, comment: string): Promise<void>
  //
  // resetActiveVersion(path: string, comment: string): Promise<void>

  getActiveByTime(path: string, time: Date): Promise<Blob>

  getActiveVersion(path: string): Promise<ConfigId[]>

  getMetadata(): Promise<ConfigMetadata>
}

export class ConfigService implements ConfigServiceApi {
  constructor(readonly tokenFactory: TokenFactory) {}

  private static async resolveConfigServer() {
    const location = await resolve(configConnection)
    return extractHostPort(location.uri)
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
    const endpoint = await ConfigService.configEndpoint(path)
    return await get({ endpoint, responseMapper: (res) => res.blob() })
  }

  private static async getActiveConfigBlob(path: string): Promise<Blob> {
    const endpoint = await ConfigService.activeConfigEndpoint(path)
    return await get({ endpoint, responseMapper: (res) => res.blob() })
  }

  getLatest(confPath: string): Promise<Blob> {
    return ConfigService.getConfigBlob(confPath)
  }

  getById(confPath: string, configId: ConfigId): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?id=${configId.id}`)
  }

  getByTime(confPath: string, time: Date): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?date=${time}`)
  }

  async exists(confPath: string, configId?: ConfigId): Promise<boolean> {
    const path = configId ? `${confPath}?id=${configId.id}` : confPath
    const endpoint = await ConfigService.configEndpoint(path)
    return await head({ endpoint })
  }

  async list(type?: FileType, pattern?: string): Promise<ConfigFileInfo[]> {
    const parameters: Record<string, string> = {}
    if (type) parameters['type'] = type
    if (pattern) parameters['pattern'] = pattern
    const endpoint = await ConfigService.configEndpoint('list')
    return await get({ endpoint, parameters })
  }

  getActive(confPath: string): Promise<Blob> {
    return ConfigService.getActiveConfigBlob(confPath)
  }

  getActiveByTime(confPath: string, time: Date): Promise<Blob> {
    return ConfigService.getActiveConfigBlob(`${confPath}?date=${time}`)
  }

  async getActiveVersion(path: string): Promise<ConfigId[]> {
    const endpoint = await ConfigService.activeVersionEndpoint(path)
    return await get({ endpoint })
  }

  async getMetadata(): Promise<ConfigMetadata> {
    const endpoint = await ConfigService.endpoint('metadata')
    return await get({ endpoint })
  }
}
