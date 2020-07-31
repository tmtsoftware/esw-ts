import 'whatwg-fetch'
import { ConfigService } from '../../src/clients/config'
import { startServices, stopServices } from '../utils/backend'
import { delay } from '../utils/eventually'

jest.setTimeout(30000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['Config'])
  await delay(5000) // wait for svn repo to initialise
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})
const token = 'valid'
const path = 'file6'
const configService = new ConfigService(() => token)
afterEach(async () => {
  // deleting file which was created in test
  await configService.delete(path, 'deleting file')
})

describe('Config Client', () => {
  test('should create, update, delete config', async () => {
    const expectedFileContent = '{key:filecontent}'

    // create file
    const configId = await configService.create(
      path,
      new Blob([expectedFileContent]),
      false,
      'creating file'
    )
    const actualFile = await configService.getById(path, configId)
    const actualFileContent = await new Response(actualFile).text()

    expect(actualFileContent).toEqual(expectedFileContent)

    //update file
    const newFileContent = '{key:new-file-content}'

    await configService.update(path, new Blob([newFileContent]), 'updating file')

    const updatedFile = await configService.getLatest(path)
    const updatedFileContent = await new Response(updatedFile).text()
    expect(updatedFileContent).toEqual(newFileContent)
  })
})
