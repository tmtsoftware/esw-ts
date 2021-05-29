import type { Location, Option, TokenFactory } from '../..'
import { CONFIG_CONNECTION } from '../../config'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { ConfigServiceImpl } from './ConfigServiceImpl'
import type { ConfigData } from './models/ConfigData'
import type * as M from './models/ConfigModels'

/**
 * A Config Service API which provides client side methods to manage configuration files residing in config server repository.
 * @interface
 * @category Service
 */
export interface ConfigService {
  /**
   * Creates a file at a specified path with given data and comment.
   *
   * @param path        the file path relative to the repository root
   * @param configData  contents of the file
   * @param annex       true if the file is annex and requires special handling (external storage)
   * @param comment     comment to associate with this operation
   * @return            ConfigId as Promise
   */
  create(path: string, configData: ConfigData, annex: boolean, comment: string): Promise<M.ConfigId>

  /**
   * Updates the file content at a specified path with given data and comment.
   *
   * @param path        the file path relative to the repository root
   * @param configData  contents of the file
   * @param comment     comment to associate with this operation
   * @return            ConfigId as Promise
   */
  update(path: string, configData: ConfigData, comment: string): Promise<M.ConfigId>

  /**
   * Gets and returns the content of active version of the file stored under the given path.
   *
   * @param path        the file path relative to the repository root
   * @return            Option<ConfigData> as Promise
   */
  getActive(path: string): Promise<Option<ConfigData>>

  /**
   * Gets and returns the content of latest version of the file stored under the given path.
   *
   * @param path        the file path relative to the repository root
   * @return            Option<ConfigData> as Promise
   */
  getLatest(path: string): Promise<Option<ConfigData>>

  /**
   * Gets and returns the file at the given path with the specified revision id.
   *
   * @param path        the file path relative to the repository root
   * @param configId    id used to specify a specific version to fetch
   * @return            Option<ConfigData> as Promise
   */
  getById(path: string, configId: M.ConfigId): Promise<Option<ConfigData>>

  /**
   * Gets the file at the given path as it existed on the given instant.
   * If instant is before the file was created, the initial version is returned.
   * If instant is after the last change, the most recent version is returned.
   *
   * @param path        the file path relative to the repository root
   * @param time        the target instant
   * @return            Option<ConfigData> as Promise
   */
  getByTime(path: string, time: Date): Promise<Option<ConfigData>>

  /**
   * Returns true if the given path exists and is being managed
   *
   * @param path        the file path relative to the repository root
   * @param id          revision of the file
   * @return            boolean as Promise
   */
  exists(path: string, id?: M.ConfigId): Promise<boolean>

  /**
   * Deletes the given config file (older versions will still be available)
   *
   * @param path        the file path relative to the repository root
   * @param comment     comment to associate with this operation
   */
  delete(path: string, comment: string): Promise<void>

  /**
   * Returns a list containing all of the known config files of given type(Annex or Normal) and whose name matches the provided pattern
   *
   * @param params      optional file type(Annex or Normal) and optional pattern to match against the file name
   * @return            ConfigFileInfo[] as Promise
   */
  list(params?: { type?: M.FileType; pattern?: string }): Promise<M.ConfigFileInfo[]>

  /**
   * Returns the history of versions of the file at the given path for a range of period specified by `from` and `to`.
   * The size of the list is limited upto `maxResults`.
   *
   * @param path        the file path relative to the repository root
   * @param from        the start of the history range
   * @param to          the end of the history range
   * @param maxResults  the maximum number of history results to return (default: unlimited)
   * @return            ConfigFileRevision[] as Promise
   */
  history(path: string, from: Date, to: Date, maxResults: number): Promise<M.ConfigFileRevision[]>

  /**
   * Returns the history of active versions of the file at the given path for a range of period specified by `from` and `to`.
   * The size of the list is limited upto `maxResults`.
   *
   * @param path        the file path relative to the repository root
   * @param from        the start of the history range
   * @param to          the end of the history range
   * @param maxResults  the maximum number of history results to return (default: unlimited)
   * @return            ConfigFileRevision[] as Promise
   */
  historyActive(
    path: string,
    from: Date,
    to: Date,
    maxResults: number
  ): Promise<M.ConfigFileRevision[]>

  /**
   * Sets the active version to be the version provided for the file at the given path.
   * If this method is not called, the active version will always be the version with which the file was created
   * After calling this method, the version with the given Id will be the active version.
   *
   * @param path        the file path relative to the repository root
   * @param id          an id used to specify a specific version
   *                    (by default the id of the version with which the file was created i.e. 1)
   * @param comment     comment to associate with this operation
   */
  setActiveVersion(path: string, id: M.ConfigId, comment: string): Promise<void>

  /**
   * Resets the "active version" of the file at the given path to the latest version.
   *
   * @param path        the file path relative to the repository root
   * @param comment     comment to associate with this operation
   */
  resetActiveVersion(path: string, comment: string): Promise<void>

  /**
   * Returns the content of active version of the file at the given path as it existed on the given instant
   *
   * @param path        the file path relative to the repository root
   * @param time        the target instant
   * @return            Option<ConfigId> as Promise
   */
  getActiveByTime(path: string, time: Date): Promise<Option<ConfigData>>

  /**
   * Returns the version which represents the "active version" of the file at the given path.
   *
   * @param path        the file path relative to the repository root
   * @return            Option<ConfigId> as Promise
   */
  getActiveVersion(path: string): Promise<Option<M.ConfigId>>

  /**
   * Query the metadata of config server
   *
   * @return            ConfigMetadata as Promise
   */
  getMetadata(): Promise<M.ConfigMetadata>
}

/**
 * Instantiate Config service to enable interaction with the config server.
 *
 * @param tokenFactory  a function that returns a valid token which has correct access roles and permissions for the config server.
 * @return              ConfigService as Promise
 * @constructor
 */
export const ConfigService = async (tokenFactory: TokenFactory): Promise<ConfigService> => {
  const location = await resolve(CONFIG_CONNECTION)
  return createConfigService(location, tokenFactory)
}

export const createConfigService = (
  location: Location,
  tokenFactory: TokenFactory
): ConfigService => {
  const { host, port } = extractHostPort(location.uri)
  return new ConfigServiceImpl(host, port, tokenFactory)
}
