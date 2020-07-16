import fs from 'fs'
import * as D from 'io-ts/lib/Decoder'
import path from 'path'
import * as M from '../../src/models'
import { Decoder } from '../../src/utils/Decoder'
import { getResponse } from '../../src/utils/Utils'
import { delay } from '../utils/eventually'
import { executeCswContract } from '../utils/shell'

jest.setTimeout(100000)

const sourceDir = path.resolve(__dirname, '../jsons')
const resourcesDir = path.resolve(__dirname, '../FakeResources') //fixme: this should not be required, fix this in csw and esw contract
const commandModelsJsonPath = `${sourceDir}/command-service/models.json`

beforeAll(async () => {
  executeCswContract([sourceDir, resourcesDir])
})

afterAll(async () => {
  fs.rmdirSync(sourceDir, { recursive: true })
  return delay(200)
})

describe('models contract test', () => {
  test('should test command models ', () => {
    const commandModels: Record<string, unknown[]> = JSON.parse(
      fs.readFileSync(commandModelsJsonPath, 'utf-8')
    )

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
  Units: M.Units,
  Parameter: M.ParameterD,
  CommandName: D.string,
  CurrentState: M.CurrentState,
  CommandIssue: M.CommandIssue,
  SubmitResponse: M.SubmitResponse,
  OnewayResponse: M.OnewayResponse,
  ValidateResponse: M.ValidateResponse,
  ControlCommand: M.ControlCommand,
  Result: M.ParamSet,
  KeyType: M.keyTagDecoder
}
