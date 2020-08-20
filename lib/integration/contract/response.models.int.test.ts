// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs'
import * as D from 'io-ts/lib/Decoder'
// eslint-disable-next-line import/no-nodejs-modules
import path from 'path'
import { Connection, ConnectionType, Location, TrackingEvent } from '../../src/clients/location'
import * as M from '../../src/models'
import { Decoder } from '../../src/utils/Decoder'
import { getOrThrow } from '../../src/utils/Utils'
import { delay } from '../utils/eventually'
import { executeCswContract, executeEswContract } from '../utils/shell'
import { Event } from '../../src/clients/event'
import { EventKeyD } from '../../src/clients/event/models/EventKey'
import { ComponentIdD, PrefixD } from '../../src/models'
import * as C from '../../src/clients/config/models/ConfigModels'
import * as Seq from '../../src/clients/sequencer/models/SequencerRes'
import { AlarmSeverity } from '../../src/clients/alarm'
import { AlarmKeyD } from '../../src/clients/alarm/models/PostCommand'
import { StepStatusD, StepD, StepListD } from '../../src/clients/sequencer/models/StepList'
import { Level, LogMetadataD } from '../../src/clients/logger'

jest.setTimeout(100000)

const sourceDir = path.resolve(__dirname, '../jsons')
const eswDir = path.resolve(__dirname, '../jsons/esw')
const cswDir = path.resolve(__dirname, '../jsons/csw')
const commandModelsJsonPath = `${cswDir}/command-service/models.json`
const locationModelsJsonPath = `${cswDir}/location-service/models.json`
const gatewayModelsJsonPath = `${eswDir}/gateway-service/models.json`
const configModelsJsonPath = `${cswDir}/config-service/models.json`
const sequencerModelsJsonPath = `${eswDir}/sequencer-service/models.json`

beforeAll(async () => {
  executeCswContract([cswDir])
  executeEswContract([eswDir])
})

afterAll(async () => {
  fs.rmdirSync(sourceDir, { recursive: true })
  return await delay(200)
})

const parseModels = (file: string) => JSON.parse(fs.readFileSync(file, 'utf-8'))

describe('models contract test', () => {
  test('Command Models | ESW-305, ESW-343, ESW-348', () => {
    verifyContract(commandModelsJsonPath, commandDecoders)
  })

  test('Location Models | ESW-308, ESW-343, ESW-348', () => {
    verifyContract(locationModelsJsonPath, locationDecoders)
  })

  test('should test Gateway models | ESW-317', () => {
    verifyContract(gatewayModelsJsonPath, gatewayDecoders)
  })

  test('should test Config models | ESW-319, ESW-320', () => {
    verifyContract(configModelsJsonPath, configDecoders)
  })

  test('should test Sequencer models | ESW-307', () => {
    verifyContract(sequencerModelsJsonPath, sequencerDecoders)
  })
})

// [ ["ComponentType", ["Container", "HCD"] ], ["ValidateResponse", [...] ] ...]
const verifyContract = (inputJsonFile: string, decoders: Record<string, Decoder<any>>) => {
  const modelSet: Record<string, unknown[]> = parseModels(inputJsonFile)
  Object.entries(modelSet).forEach(([modelName, models]) => {
    models.forEach((modelJson) => testRoundTrip(modelJson, decoders[modelName]))
  })
}

const testRoundTrip = (scalaJsonModel: unknown, decoder: Decoder<any>) => {
  const decodedModel = getOrThrow(decoder.decode(scalaJsonModel)) // typescript side of decoding
  const tsJsonModel = JSON.parse(JSON.stringify(decodedModel)) // encoding
  expect(scalaJsonModel).toEqual(tsJsonModel)
}

const commandDecoders: Record<string, Decoder<any>> = {
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
  ComponentType: M.ComponentType,
  Connection: Connection,
  Registration: D.id(),
  ComponentId: M.ComponentIdD,
  Prefix: M.PrefixD,
  LocationServiceError: D.id(),
  ConnectionType: ConnectionType,
  Subsystem: M.Subsystem,
  Location: Location
}

const gatewayDecoders: Record<string, Decoder<any>> = {
  Subsystem: M.Subsystem,
  AlarmSeverity: AlarmSeverity,
  AlarmKey: AlarmKeyD,
  ComponentId: ComponentIdD,
  EventKey: EventKeyD,
  Event: Event,
  GatewayException: D.id(),
  Prefix: PrefixD,
  LogMetadata: LogMetadataD,
  Level: Level
}

const configDecoders: Record<string, Decoder<any>> = {
  ConfigId: C.ConfigIdD,
  FileType: C.FileType,
  ConfigMetadata: C.ConfigMetadata,
  ConfigFileInfo: C.ConfigFileInfo,
  ConfigFileRevision: C.ConfigFileRevision
}

const sequencerDecoders: Record<string, Decoder<any>> = {
  SequenceCommand: M.SequenceCommand,
  AkkaLocation: D.id(), //Using identity decoder  since the backend api(getSequenceComp) which returns this model is not provided in typescript
  GenericResponse: Seq.GenericResponse,
  PauseResponse: Seq.PauseResponse,
  SubmitResponse: M.SubmitResponse,
  GoOfflineResponse: Seq.GoOfflineResponse,
  GoOnlineResponse: Seq.GoOnlineResponse,
  OperationsModeResponse: Seq.OperationsModeResponse,
  OkOrUnhandledResponse: Seq.OkOrUnhandledResponse,
  DiagnosticModeResponse: Seq.DiagnosticModeResponse,
  RemoveBreakpointResponse: Seq.RemoveBreakpointResponse,
  StepStatus: StepStatusD,
  Step: StepD,
  StepList: StepListD
}
