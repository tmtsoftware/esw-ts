import {
  DiagnosticModeResponse,
  GoOfflineResponse,
  GoOnlineResponse,
  OkOrUnhandledResponse,
  OperationsModeResponse,
  PauseResponse,
  RemoveBreakpointResponse
} from '../../../../src/clients/sequencer'
import * as TestData from '../../../jsons/SequencerResponses.json'
import { getOrThrow } from './../../../../src/utils/Utils'

const ok: OkOrUnhandledResponse = { _type: 'Ok' }

const cannotOperateOnAnInFlightOrFinishedStep: PauseResponse = {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

const idDoesNotExist: RemoveBreakpointResponse = {
  _type: 'IdDoesNotExist',
  id: 'id-1234'
}

const unhandled: OkOrUnhandledResponse = {
  _type: 'Unhandled',
  state: 'offline',
  messageType: 'StartSequence',
  msg: "Sequencer can not accept 'StartSequence' message in 'offline' state"
}

const goOnlineHookFailed: GoOnlineResponse = {
  _type: 'GoOnlineHookFailed'
}

const goOfflineHookFailed: GoOfflineResponse = {
  _type: 'GoOfflineHookFailed'
}

const diagnosticHookFailed: DiagnosticModeResponse = {
  _type: 'DiagnosticHookFailed'
}

const operationsHookFailed: OperationsModeResponse = {
  _type: 'OperationsHookFailed'
}

describe('Sequencer Response Contract', () => {
  test.each([
    ['Ok', ok, getOrThrow(OkOrUnhandledResponse.decode(TestData.Ok))],
    [
      'IdDoesNotExist',
      idDoesNotExist,
      getOrThrow(RemoveBreakpointResponse.decode(TestData.IdDoesNotExist))
    ],
    ['Unhandled', unhandled, getOrThrow(OkOrUnhandledResponse.decode(TestData.Unhandled))],
    [
      'GoOnlineHookFailed',
      goOnlineHookFailed,
      getOrThrow(GoOnlineResponse.decode(TestData.GoOnlineHookFailed))
    ],
    [
      'GoOfflineHookFailed',
      goOfflineHookFailed,
      getOrThrow(GoOfflineResponse.decode(TestData.GoOfflineHookFailed))
    ],
    [
      'DiagnosticHookFailed',
      diagnosticHookFailed,
      getOrThrow(DiagnosticModeResponse.decode(TestData.DiagnosticHookFailed))
    ],
    [
      'OperationsHookFailed',
      operationsHookFailed,
      getOrThrow(OperationsModeResponse.decode(TestData.OperationsHookFailed))
    ],
    [
      'CannotOperateOnAnInFlightOrFinishedStep',
      cannotOperateOnAnInFlightOrFinishedStep,
      getOrThrow(PauseResponse.decode(TestData.CannotOperateOnAnInFlightOrFinishedStep))
    ]
  ])('%s | ESW-307', (_, actual, expected) => expect(actual).toEqual(expected))
})
