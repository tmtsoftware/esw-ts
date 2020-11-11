import 'whatwg-fetch'
import { Option, setAppConfigPath } from '../../src'
import {
  ConfigData,
  ConfigFileRevision,
  ConfigId,
  ConfigMetadata,
  ConfigService
} from '../../src/clients/config-service'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import { startServices, stopServices } from '../utils/backend'
import { delay } from '../utils/eventually'

jest.setTimeout(30000)

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  await startServices(['Config'])
  await delay(5000) // wait for svn repo to initialise
  configService = await ConfigService(() => token)
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

const token = 'validToken'
const path = 'somepath'
let configService: ConfigService
const config1 = '{key:filecontent1}'
const config2 = '{key:filecontent2}'
const config3 = '{key:filecontent3}'

beforeEach(async () => {
  try {
    // deleting file which was created in test
    await configService.delete(path, 'deleting file')
  } catch (e) {}
})

describe('Config Client', () => {
  test('should get unauthorized error on sending invalid token | ESW-99', async () => {
    const expectedFileContent = '{key:filecontent}'
    const invalidConfigService = await ConfigService(() => '')
    expect.assertions(3)
    await invalidConfigService
      .create(path, ConfigData.fromString(expectedFileContent), false, 'creating file')
      .catch((e) => {
        expect(e.errorType).toBe('TransportError')
        expect(e.status).toBe(401)
        expect(e.statusText).toBe('Unauthorized')
        //TODO: uncomment this after fixing the config service exception handlers
        // expect(e.message).toBe(
        //   'The resource requires authentication, which was not supplied with the request'
        // )
      })
  })

  test('should create, getById, update, delete config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'
    // create file
    const configId = await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const configData1 = await configService.getById(path, configId)
    const actualFileContent = await configData1?.fileContentAsString()

    expect(actualFileContent).toEqual(expectedFileContent)

    //update file
    const newFileContent = '{key:new-file-content}'

    await configService.update(path, ConfigData.fromString(newFileContent), 'updating file')

    const configData2 = await configService.getLatest(path)
    const updatedFileContent = await configData2?.fileContentAsString()

    expect(updatedFileContent).toEqual(newFileContent)
  })

  test('should getActive config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'

    await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const configData1 = await configService.getActive(path)
    const actualFileContent = await configData1?.fileContentAsString()
    expect(actualFileContent).toEqual(expectedFileContent)
  })

  test('should getLatest config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'

    await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const actualFile = await configService.getLatest(path)
    const actualFileContent = await new Response(actualFile?.toBlob()).text()
    expect(actualFileContent).toEqual(expectedFileContent)
  })

  test('should getByTime config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'

    await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const actualFile = await configService.getByTime(path, new Date())
    const actualFileContent = await new Response(actualFile?.toBlob()).text()
    expect(actualFileContent).toEqual(expectedFileContent)
  })

  test('should check if exists config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'

    const configId = await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const exists = await configService.exists(path, configId)
    expect(exists).toEqual(true)
  })

  test('should list config | ESW-320', async () => {
    const expectedFileContent = '{key:filecontent}'

    const configId = await configService.create(
      path,
      ConfigData.fromString(expectedFileContent),
      false,
      'creating file'
    )
    const configFileInfo = (await configService.list({ type: 'Normal', pattern: '.*' }))[0]
    expect(configFileInfo.path).toEqual(path)
    expect(configFileInfo.id).toEqual(configId)
    expect(configFileInfo.author).toEqual('test')
    expect(configFileInfo.comment).toEqual('creating file')
  })

  test('should get file revisions of a config between a time period | ESW-320', async () => {
    // create file
    await configService.create(path, ConfigData.fromString(config1), false, 'creating file')

    const from = new Date()
    const configId2 = await configService.update(
      path,
      ConfigData.fromString(config2),
      'updating file'
    )
    const configId3 = await configService.update(
      path,
      ConfigData.fromString(config3),
      'updating file'
    )
    const to = new Date()

    const expectedFileRevision: ConfigFileRevision[] = [
      {
        author: 'test',
        comment: 'updating file',
        id: configId3,
        time: ''
      },
      {
        author: 'test',
        comment: 'updating file',
        id: configId2,
        time: ''
      }
    ]

    // verify file contents based on time (i.e before and after setting version)
    const configFileRevisions = await configService.history(path, from, to, 5)
    configFileRevisions.forEach((value, index) => {
      expect(value.id).toEqual(expectedFileRevision[index].id)
      expect(value.comment).toEqual(expectedFileRevision[index].comment)
    })
  })

  test('should get active file revisions of a config between a time period | ESW-320', async () => {
    // create file
    const configId = await configService.create(
      path,
      ConfigData.fromString(config1),
      false,
      'creating file'
    )

    const from = new Date()
    await configService.setActiveVersion(path, configId, 'set active 1')
    const configId2 = await configService.update(
      path,
      ConfigData.fromString(config2),
      'updating file'
    )
    await configService.setActiveVersion(path, configId2, 'set active 2')
    await configService.update(path, ConfigData.fromString(config3), 'updating file')
    const to = new Date()

    const expectedFileRevision: ConfigFileRevision[] = [
      {
        author: 'test',
        comment: 'set active 2',
        id: configId2,
        time: ''
      },
      {
        author: 'test',
        comment: 'set active 1',
        id: configId,
        time: ''
      }
    ]
    // verify file contents based on time (i.e before and after setting version)
    const configFileRevisions = await configService.historyActive(path, from, to, 5)
    configFileRevisions.forEach((value, index) => {
      expect(value.id).toEqual(expectedFileRevision[index].id)
      expect(value.comment).toEqual(expectedFileRevision[index].comment)
    })
  })

  test('should set active version of config | ESW-320', async () => {
    // create file
    const configId = await configService.create(
      path,
      ConfigData.fromString(config1),
      false,
      'creating file'
    )
    // update file
    const configId2 = await configService.update(
      path,
      ConfigData.fromString(config2),
      'updating file'
    )
    await configService.setActiveVersion(
      path,
      configId2,
      'setting active version to first file content'
    )
    const updateTimeStamp = new Date()

    await configService.setActiveVersion(
      path,
      configId,
      'setting active version to first file content'
    )

    // verify file contents based on time (i.e before and after setting version)
    const maybeConfigData = await configService.getActiveByTime(path, updateTimeStamp)
    expect(await new Response(maybeConfigData?.toBlob()).text()).toEqual(config2)
    const maybeConfigData2 = await configService.getActiveByTime(path, new Date())
    expect(await new Response(maybeConfigData2?.toBlob()).text()).toEqual(config1)
  })

  test('should reset active version of config | ESW-320', async () => {
    // create file
    await configService.create(path, ConfigData.fromString(config1), false, 'creating file')

    // update file two times
    const configId = await configService.update(
      path,
      ConfigData.fromString(config2),
      'updating file'
    )
    await configService.update(path, ConfigData.fromString(config3), 'updating file')

    const updateTimeStamp = new Date()
    await configService.setActiveVersion(path, configId, 'setting active version to second')

    const timeStampBeforeResetting = new Date()
    await configService.resetActiveVersion(path, 'resetting version')

    // verify file contents based on time (i.e before and after resetting version)
    const maybeConfigData = await configService.getActiveByTime(path, updateTimeStamp)
    expect(await maybeConfigData?.fileContentAsString()).toEqual(config1)

    const maybeConfigData2 = await configService.getActiveByTime(path, timeStampBeforeResetting)
    expect(await maybeConfigData2?.fileContentAsString()).toEqual(config2)
    const maybeConfigData3 = await configService.getActiveByTime(path, new Date())
    expect(await maybeConfigData3?.fileContentAsString()).toEqual(config3)
  })

  test('should get active version of file by a given time | ESW-320', async () => {
    const fileContent = '{key:filecontent}'
    await configService.create(path, ConfigData.fromString(fileContent), false, 'creating file')

    const configData = await configService.getActiveByTime(path, new Date())
    const updatedFileContent = await configData?.fileContentAsString()
    expect(updatedFileContent).toEqual(fileContent)
  })

  test('should get active version of file | ESW-320', async () => {
    const expectedConfigId = await configService.create(
      path,
      ConfigData.fromString('{key:filecontent}'),
      false,
      'creating file'
    )

    const configId: Option<ConfigId> = await configService.getActiveVersion(path)

    expect(configId).toEqual(expectedConfigId)
  })

  test('should get metadata of config server | ESW-320', async () => {
    const expectedMetadata: ConfigMetadata = {
      annexMinFileSize: '10 MiB',
      annexPath: '/tmp/csw-config-annex-files',
      maxConfigFileSize: '50 MiB',
      repoPath: '/tmp/csw-config-svn'
    }

    const configMetadata: ConfigMetadata = await configService.getMetadata()

    expect(configMetadata).toEqual(expectedMetadata)
  })
})
