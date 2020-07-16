import * as D from 'io-ts/lib/Decoder'
import fs from 'fs'
import { executeCswContract, executeRmDir } from '../utils/shell'
import { pathDir, waitFor } from '../utils/FileUtils'
import { Decoder } from '../../src/utils/Decoder'
import {
  CommandIssue,
  ControlCommand,
  CurrentState,
  KeyTag,
  OnewayResponse,
  ParameterD,
  ParamSet,
  SubmitResponse,
  Units,
  ValidateResponse
} from '../../src/models'
import { getResponse } from '../../src/utils/Utils'

jest.setTimeout(100000)

let commandModels: Record<string, unknown[]>

const sourceDir = pathDir('../jsons')
const resourcesDir = pathDir('../FakeResources')
const commandModelsJsonPath = `${sourceDir}/command-service/models.json`

beforeAll(async () => {
  executeCswContract([sourceDir, resourcesDir])

  await waitFor(commandModelsJsonPath)
  commandModels = JSON.parse(fs.readFileSync(commandModelsJsonPath, 'utf-8'))
})

afterAll(async () => {
  executeRmDir([sourceDir])
  return await new Promise((resolve) => setTimeout(resolve, 200))
})

describe('models contract test', () => {
  test('should test command models ', () => {
    Object.entries(commandModels).forEach(([responseName, responseModels]) => {
      responseModels.forEach((response) => {
        testRoundTrip(response, decoders[responseName])
      })
    })
  })
})

const testRoundTrip = (json: unknown, decoder: Decoder<any>) => {
  const response = getResponse(decoder.decode(json))
  expect(json).toEqual(JSON.parse(JSON.stringify(response)))
}

const decoders: Record<string, Decoder<any>> = {
  Units: Units,
  Parameter: ParameterD,
  CommandName: D.string,
  CurrentState: CurrentState,
  CommandIssue: CommandIssue,
  SubmitResponse: SubmitResponse,
  OnewayResponse: OnewayResponse,
  ValidateResponse: ValidateResponse,
  ControlCommand: ControlCommand,
  Result: ParamSet,
  KeyType: KeyTag
}
