import { HttpConnection } from '../location'
import { Prefix } from '../../models'
import { resolve } from '../location/LocationUtils'
import { download, get, head } from '../../utils/Http'
import { extractHostPort } from '../../utils/Utils'
import { ConfigData, ConfigId } from './models/ConfigModels'
import { TokenFactory } from '../../utils/HttpTransport'

interface ConfigServiceApi {
  // create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<ConfigId>
  //
  // update(path: string, configData: ConfigData, comment: string): Promise<ConfigId>
  //
  // getActive(path: string): Promise<ConfigData | undefined>
  //
  getLatest(path: string, writer: (data: any, path: string) => void): Promise<void>

  getById(
    path: string,
    configId: ConfigId,
    writer: (data: any, path: string) => void
  ): Promise<void>

  getByTime(path: string, time: Date, writer: (data: any, path: string) => void): Promise<void>


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

  private async resolveConfigServer() {
    const httpConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
    const location = await resolve(httpConnection)
    return extractHostPort(location.uri)
  }

  private async getConf(path: string): Promise<Blob> {
    const { host, port } = await this.resolveConfigServer()
    return get(host, port, { path, parser: (res) => res.blob() })
  }

  private async writeConf(conf: any, path: string, writer: (data: any, path: string) => void) {
    const fileName = path.split('/').pop() || path
    writer(conf, fileName)
  }

  getLatest(confPath: string, writer: (data: any, path: string) => void = download): Promise<void> {
    const path = `config/${confPath}`
    return this.getConf(path).then((blob) => this.writeConf(blob, path, writer))
  }

  getById(
    confPath: string,
    configId: ConfigId,
    writer: (data: any, path: string) => void = download
  ): Promise<void> {
    const path = `config/${confPath}?id=${configId}`
    return this.getConf(path).then((blob) => this.writeConf(blob, path, writer))
  }

  getByTime(
    confPath: string,
    time: Date,
    writer: (data: any, path: string) => void
  ): Promise<void> {
    const path = `config/${confPath}?date=${time}`
    return this.getConf(path).then((blob) => this.writeConf(blob, path, writer))
  }

}
