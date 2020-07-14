import * as TestData from '../../../jsons/SequencerResponses.json'
import {
  DiagnosticModeResponse,
  GoOfflineResponse,
  GoOnlineResponse,
  OkOrUnhandledResponse,
  OperationsModeResponse,
  PauseResponse,
  RemoveBreakpointResponse
} from '../../../../src/clients/sequencer'
import { get } from '../../../helpers/TestUtils'

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
  _type: 'GoOnlineHookFailed',
  msg: ''
}

const goOfflineHookFailed: GoOfflineResponse = {
  _type: 'GoOfflineHookFailed',
  msg: ''
}

const diagnosticHookFailed: DiagnosticModeResponse = {
  _type: 'DiagnosticHookFailed',
  msg: ''
}

const operationsHookFailed: OperationsModeResponse = {
  _type: 'OperationsHookFailed',
  msg: ''
}

describe('Sequencer Response Contract', () => {
  test.each([
    ['Ok', ok, get(OkOrUnhandledResponse.decode(TestData.Ok))],
    [
      'IdDoesNotExist',
      idDoesNotExist,
      get(RemoveBreakpointResponse.decode(TestData.IdDoesNotExist))
    ],
    ['Unhandled', unhandled, get(OkOrUnhandledResponse.decode(TestData.Unhandled))],
    [
      'GoOnlineHookFailed',
      goOnlineHookFailed,
      get(GoOnlineResponse.decode(TestData.GoOnlineHookFailed))
    ],
    [
      'GoOfflineHookFailed',
      goOfflineHookFailed,
      get(GoOfflineResponse.decode(TestData.GoOfflineHookFailed))
    ],
    [
      'DiagnosticHookFailed',
      diagnosticHookFailed,
      get(DiagnosticModeResponse.decode(TestData.DiagnosticHookFailed))
    ],
    [
      'OperationsHookFailed',
      operationsHookFailed,
      get(OperationsModeResponse.decode(TestData.OperationsHookFailed))
    ],
    [
      'CannotOperateOnAnInFlightOrFinishedStep',
      cannotOperateOnAnInFlightOrFinishedStep,
      get(PauseResponse.decode(TestData.CannotOperateOnAnInFlightOrFinishedStep))
    ]
  ])('%s | ESW-307', (_, actual, expected) => expect(actual).toEqual(expected))
})
