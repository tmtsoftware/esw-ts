import { configConnection } from '../../config/connections'
import { get, head } from '../../utils/Http'
import { TokenFactory } from '../../utils/TokenFactory'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { ConfigId } from './models/ConfigModels'

export interface ConfigServiceApi {
  // create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<ConfigId>
  //
  // update(path: string, configData: ConfigData, comment: string): Promise<ConfigId>
  //
  // getActive(path: string): Promise<ConfigData | undefined>
  //
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
  //
  // getActiveByTime(path: string, time: Date): Promise<ConfigData | undefined>
  //
  // getActiveVersion(path: string): Promise<ConfigData | undefined>
  //
  // getMetadata(): Promise<ConfigMetadata>
}

export class ConfigService implements ConfigServiceApi {
  constructor(readonly tokenFactory: TokenFactory) {}

  private static async resolveConfigServer() {
    const location = await resolve(configConnection)
    return extractHostPort(location.uri)
  }

  private static async endpoint(path: string) {
    const { host, port } = await ConfigService.resolveConfigServer()
    return `http://${host}:${port}/config/${path}`
  }

  private static async getConfigBlob(path: string): Promise<Blob> {
    const endpoint = await ConfigService.endpoint(path)
    return get({ endpoint, responseMapper: (res) => res.blob() })
  }

  getLatest(confPath: string): Promise<Blob> {
    return ConfigService.getConfigBlob(confPath)
  }

  getById(confPath: string, configId: ConfigId): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?id=${configId}`)
  }

  getByTime(confPath: string, time: Date): Promise<Blob> {
    return ConfigService.getConfigBlob(`${confPath}?date=${time}`)
  }

  async exists(confPath: string, id?: ConfigId): Promise<boolean> {
    const path = id ? `${confPath}?id=${id}` : confPath
    const endpoint = await ConfigService.endpoint(path)
    return await head({ endpoint })
  }

  async list(type?: FileType, pattern?: string): Promise<ConfigFileInfo[]> {
    const parameters: Record<string, string> = {}
    if (type) parameters['type'] = type
    if (pattern) parameters['pattern'] = pattern
    const endpoint = await ConfigService.configEndpoint('list')
    return await get({ endpoint, parameters })
  }
}
