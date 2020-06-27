import { configConnection } from '../../config/connections'
import { download } from '../../utils/download'
import { get, head } from '../../utils/Http'
import { TokenFactory } from '../../utils/TokenFactory'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { ConfigId } from './models/ConfigModels'

export type Writer = (data: any, path: string) => void

export interface ConfigServiceApi {
  // create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<ConfigId>
  //
  // update(path: string, configData: ConfigData, comment: string): Promise<ConfigId>
  //
  // getActive(path: string): Promise<ConfigData | undefined>
  //
  getLatest(path: string, writer: Writer): Promise<void>

  getById(path: string, configId: ConfigId, writer: Writer): Promise<void>

  getByTime(path: string, time: Date, writer: Writer): Promise<void>

  exists(path: string, id?: ConfigId): Promise<boolean>

  // delete(path: string, comment: string): Promise<void>
  //
  // list(fileType?: FileType, pattern?: string): Promise<ConfigFileInfo[]>
  //
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

  private static async get(path: string): Promise<Blob> {
    const endpoint = await ConfigService.endpoint(path)
    return get({ endpoint, responseMapper: (res) => res.blob() })
  }

  private static write(conf: any, path: string, writer: Writer) {
    const fileName = path.split('/').pop() || path
    return writer(conf, fileName)
  }

  private static async getAndWrite(confPath: string, writer: Writer) {
    const blob = await ConfigService.get(confPath)
    return ConfigService.write(blob, confPath, writer)
  }

  getLatest(confPath: string, writer: Writer = download): Promise<void> {
    return ConfigService.getAndWrite(confPath, writer)
  }

  getById(confPath: string, configId: ConfigId, writer: Writer = download): Promise<void> {
    const path = `${confPath}?id=${configId}`
    return ConfigService.getAndWrite(path, writer)
  }

  getByTime(confPath: string, time: Date, writer: Writer): Promise<void> {
    const path = `${confPath}?date=${time}`
    return ConfigService.getAndWrite(path, writer)
  }

  async exists(confPath: string, id?: ConfigId): Promise<boolean> {
    const path = id ? `${confPath}?id=${id}` : confPath
    const endpoint = await ConfigService.endpoint(path)
    return await head({ endpoint })
  }
}
