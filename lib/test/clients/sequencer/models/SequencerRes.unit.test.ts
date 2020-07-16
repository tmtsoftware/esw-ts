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
import { getResponse } from './../../../../src/utils/Utils'

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
    ['Ok', ok, getResponse(OkOrUnhandledResponse.decode(TestData.Ok))],
    [
      'IdDoesNotExist',
      idDoesNotExist,
      getResponse(RemoveBreakpointResponse.decode(TestData.IdDoesNotExist))
    ],
    ['Unhandled', unhandled, getResponse(OkOrUnhandledResponse.decode(TestData.Unhandled))],
    [
      'GoOnlineHookFailed',
      goOnlineHookFailed,
      getResponse(GoOnlineResponse.decode(TestData.GoOnlineHookFailed))
    ],
    [
      'GoOfflineHookFailed',
      goOfflineHookFailed,
      getResponse(GoOfflineResponse.decode(TestData.GoOfflineHookFailed))
    ],
    [
      'DiagnosticHookFailed',
      diagnosticHookFailed,
      getResponse(DiagnosticModeResponse.decode(TestData.DiagnosticHookFailed))
    ],
    [
      'OperationsHookFailed',
      operationsHookFailed,
      getResponse(OperationsModeResponse.decode(TestData.OperationsHookFailed))
    ],
    [
      'CannotOperateOnAnInFlightOrFinishedStep',
      cannotOperateOnAnInFlightOrFinishedStep,
      getResponse(PauseResponse.decode(TestData.CannotOperateOnAnInFlightOrFinishedStep))
    ]
  ])('%s | ESW-307', (_, actual, expected) => expect(actual).toEqual(expected))
})
