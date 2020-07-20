import fs from 'fs'
import * as D from 'io-ts/lib/Decoder'
import path from 'path'
import * as M from '../../src/models'
import { ComponentIdD, ComponentType, PrefixD, Subsystem } from '../../src/models'
import { Decoder } from '../../src/utils/Decoder'
import { getOrThrow } from '../../src/utils/Utils'
import { delay } from '../utils/eventually'
import { executeCswContract } from '../utils/shell'
import { Connection, ConnectionType, Location, TrackingEvent } from '../../src/clients/location'

jest.setTimeout(100000)

const sourceDir = path.resolve(__dirname, '../jsons')
const resourcesDir = path.resolve(__dirname, '../FakeResources') //fixme: this should not be required, fix this in csw and esw contract
const commandModelsJsonPath = `${sourceDir}/command-service/models.json`
const locationModelsJsonPath = `${sourceDir}/location-service/models.json`

beforeAll(async () => {
  executeCswContract([sourceDir])
})

afterAll(async () => {
  // fs.rmdirSync(sourceDir, { recursive: true })
  return await delay(200)
})

describe('models contract test', () => {
  test('should test command models | ESW-305, ESW-343, ESW-348', () => {
    const commandModelSet: Record<string, unknown[]> = JSON.parse(
      fs.readFileSync(commandModelsJsonPath, 'utf-8')
    )

    // [ ["ComponentType", ["Container", "HCD"] ], ["ValidateResponse", [...] ] ...]

    Object.entries(commandModelSet).forEach(([modelName, models]) => {
      models.forEach((modelJson) => {
        testRoundTrip(modelJson, decoders[modelName])
      })
    })
  })

  test('should test location models | ESW-308, ESW-343, ESW-348', () => {
    const locationModels: Record<string, unknown[]> = JSON.parse(
      fs.readFileSync(locationModelsJsonPath, 'utf-8')
    )

    Object.entries(locationModels).forEach(([responseName, responseModels]) => {
      responseModels.forEach((response) => {
        testRoundTrip(response, locationDecoders[responseName])
      })
    })
  })
})

const testRoundTrip = (json: unknown, decoder: Decoder<any>) => {
  const model = getOrThrow(decoder.decode(json)) // typescript side of decoding
  expect(json).toEqual(JSON.parse(JSON.stringify(model))) // encoding
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

const locationDecoders: Record<string, Decoder<any>> = {
  TrackingEvent: TrackingEvent,
  ComponentType: ComponentType,
  Connection: Connection,
  Registration: D.id(),
  ComponentId: ComponentIdD,
  Prefix: PrefixD,
  LocationServiceError: D.id(),
  ConnectionType: ConnectionType,
  Subsystem: Subsystem,
  Location: Location
}
