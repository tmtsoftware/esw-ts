// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs'
import * as D from 'io-ts/lib/Decoder'
// eslint-disable-next-line import/no-nodejs-modules
import path from 'path'
import {
  ContainerLifecycleStateD,
  SupervisorLifecycleStateD
} from '../../src/decoders/AdminDecoders'
import {
  AgentStatusResponseD,
  KillResponseD,
  SpawnResponseD
} from '../../src/decoders/AgentDecoders'
import { AlarmKeyD, AlarmSeverityD } from '../../src/decoders/AlarmDecoders'
// eslint-disable-next-line
import * as Seq from '../../src/decoders/SequencerDecoders'
import {
  CommandIssueD,
  CommandResponseD,
  ControlCommandD,
  OnewayResponseD,
  SequenceCommandD,
  SubmitResponseD,
  ValidateResponseD
} from '../../src/decoders/CommandDecoders'
import { ComponentIdD } from '../../src/decoders/ComponentIdDecoder'
import { ComponentTypeD } from '../../src/decoders/ComponentTypeDecoder'
import * as C from '../../src/decoders/ConfigDecoders'
import { CurrentStateD } from '../../src/decoders/CurrentStateDecoder'
import type { Decoder } from '../../src/decoders/Decoder'
import { EventD, EventKeyD } from '../../src/decoders/EventDecoders'
import { keyTagDecoder } from '../../src/decoders/KeyDecoders'
import {
  ConnectionD,
  ConnectionTypeD,
  LocationD,
  TrackingEventD
} from '../../src/decoders/LocationDecoders'
import { LevelD, LogMetadataD } from '../../src/decoders/LoggerDecoders'
import { ParameterD } from '../../src/decoders/ParameterDecoder'
import { PrefixD } from '../../src/decoders/PrefixDecoder'
import { ResultD } from '../../src/decoders/ResultDecoder'
import {
  ConfigureResponseD,
  ObsModeD,
  ObsModeDetailsD,
  ObsModesDetailsResponseD,
  ObsModeStatusD,
  ProvisionResponseD,
  ResourcesStatusResponseD,
  ResourceStatusD,
  ResourceStatusResponseD,
  RestartSequencerResponseD,
  ShutdownSequencersOrSeqCompResponseD,
  StartSequencerResponseD
} from '../../src/decoders/SequenceManagerDecoders'
import { SubsystemD } from '../../src/decoders/SubsystemDecoder'
import { UnitsD } from '../../src/decoders/UnitsDecoder'
import { getOrThrow } from '../../src/utils/Utils'
import { delay } from '../utils/eventually'
import { executeCswContract, executeEswContract } from '../utils/shell'

jest.setTimeout(100000)

const sourceDir = path.resolve(__dirname, '../jsons')
const eswDir = path.resolve(__dirname, '../jsons/esw')
const cswDir = path.resolve(__dirname, '../jsons/csw')
const commandModelsJsonPath = `${cswDir}/command-service/models.json`
const locationModelsJsonPath = `${cswDir}/location-service/models.json`
const gatewayModelsJsonPath = `${eswDir}/gateway-service/models.json`
const configModelsJsonPath = `${cswDir}/config-service/models.json`
const sequencerModelsJsonPath = `${eswDir}/sequencer-service/models.json`
const sequenceManagerModelsJsonPath = `${eswDir}/sequence-manager-service/models.json`
const agentServiceModelsJsonPath = `${eswDir}/agent-service/models.json`

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

  test('should test Sequence Manager models | ESW-356', () => {
    verifyContract(sequenceManagerModelsJsonPath, sequenceManagerDecoders)
  })

  test('should test Agent service models | ESW-376', () => {
    verifyContract(agentServiceModelsJsonPath, agentServiceDecoders)
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
  Units: UnitsD,
  Parameter: ParameterD,
  CommandName: D.string,
  CurrentState: CurrentStateD,
  CommandIssue: CommandIssueD,
  SubmitResponse: SubmitResponseD,
  OnewayResponse: OnewayResponseD,
  CommandResponseD: CommandResponseD,
  ValidateResponse: ValidateResponseD,
  ControlCommand: ControlCommandD,
  Result: ResultD,
  KeyType: keyTagDecoder
}

const locationDecoders: Record<string, Decoder<any>> = {
  TrackingEvent: TrackingEventD,
  ComponentType: ComponentTypeD,
  Connection: ConnectionD,
  Registration: D.id(),
  ComponentId: ComponentIdD,
  Prefix: PrefixD,
  LocationServiceError: D.id(),
  ConnectionType: ConnectionTypeD,
  Subsystem: SubsystemD,
  Location: LocationD
}

const gatewayDecoders: Record<string, Decoder<any>> = {
  Subsystem: SubsystemD,
  AlarmSeverity: AlarmSeverityD,
  AlarmKey: AlarmKeyD,
  ComponentId: ComponentIdD,
  EventKey: EventKeyD,
  Event: EventD,
  GatewayException: D.id(),
  Prefix: PrefixD,
  LogMetadata: LogMetadataD,
  Level: LevelD,
  SupervisorLifecycleState: SupervisorLifecycleStateD,
  ContainerLifecycleState: ContainerLifecycleStateD
}

const configDecoders: Record<string, Decoder<any>> = {
  ConfigId: C.ConfigIdD,
  FileType: C.FileTypeD,
  ConfigMetadata: C.ConfigMetadataD,
  ConfigFileInfo: C.ConfigFileInfoD,
  ConfigFileRevision: C.ConfigFileRevisionD
}

const sequencerDecoders: Record<string, Decoder<any>> = {
  SequenceCommand: SequenceCommandD,
  AkkaLocation: D.id(), //Using identity decoder  since the backend api(getSequenceComp) which returns this model is not provided in typescript
  GenericResponse: Seq.GenericResponseD,
  PauseResponse: Seq.PauseResponseD,
  SubmitResponse: SubmitResponseD,
  GoOfflineResponse: Seq.GoOfflineResponseD,
  GoOnlineResponse: Seq.GoOnlineResponseD,
  OperationsModeResponse: Seq.OperationsModeResponseD,
  OkOrUnhandledResponse: Seq.OkOrUnhandledResponseD,
  DiagnosticModeResponse: Seq.DiagnosticModeResponseD,
  RemoveBreakpointResponse: Seq.RemoveBreakpointResponseD,
  StepStatus: Seq.StepStatusD,
  Step: Seq.StepD,
  StepList: Seq.StepListD,
  SequencerState: Seq.SequencerStateD,
  SequencerStateResponse: Seq.SequencerStateResponseD
}

const sequenceManagerDecoders: Record<string, Decoder<any>> = {
  ConfigureResponse: ConfigureResponseD,
  ProvisionResponse: ProvisionResponseD,
  ObsModesDetailsResponse: ObsModesDetailsResponseD,
  ObsModeDetails: ObsModeDetailsD,
  ObsModeStatus: ObsModeStatusD,
  StartSequencerResponse: StartSequencerResponseD,
  RestartSequencerResponse: RestartSequencerResponseD,
  ShutdownSequencersResponse: ShutdownSequencersOrSeqCompResponseD,
  ShutdownSequenceComponentResponse: ShutdownSequencersOrSeqCompResponseD,
  Prefix: PrefixD,
  ObsMode: ObsModeD,
  Subsystem: SubsystemD,
  ProvisionConfig: D.id(),
  ResourcesStatusResponse: ResourcesStatusResponseD,
  ResourceStatus: ResourceStatusD,
  ResourceStatusResponse: ResourceStatusResponseD,
  Resource: SubsystemD
}

const agentServiceDecoders: Record<string, Decoder<any>> = {
  SpawnResponse: SpawnResponseD,
  KillResponse: KillResponseD,
  AgentStatusResponse: AgentStatusResponseD
}
