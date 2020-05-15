import {
  CannotOperateOnAnInFlightOrFinishedStep,
  DiagnosticHookFailed,
  GoOfflineHookFailed,
  GoOnlineHookFailed,
  IdDoesNotExist,
  Ok,
  OperationsHookFailed,
  Unhandled
} from 'clients/sequencer/models/SequencerRes'
import * as TestData from 'jsons/SequencerResponses.json'

const ok: Ok = { _type: 'Ok' }

const cannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStep = {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

const idDoesNotExist: IdDoesNotExist = {
  _type: 'IdDoesNotExist',
  id: 'id-1234'
}

const unhandled: Unhandled = {
  _type: 'Unhandled',
  state: 'offline',
  messageType: 'StartSequence',
  msg: "Sequencer can not accept 'StartSequence' message in 'offline' state"
}

const goOnlineHookFailed: GoOnlineHookFailed = {
  _type: 'GoOnlineHookFailed',
  msg: ''
}

const goOfflineHookFailed: GoOfflineHookFailed = {
  _type: 'GoOfflineHookFailed',
  msg: ''
}

const diagnosticHookFailed: DiagnosticHookFailed = {
  _type: 'DiagnosticHookFailed',
  msg: ''
}

const operationsHookFailed: OperationsHookFailed = {
  _type: 'OperationsHookFailed',
  msg: ''
}

describe('Sequencer Response Contract', () => {
  test.each([
    ['Ok', ok, TestData.Ok],
    ['IdDoesNotExist', idDoesNotExist, TestData.IdDoesNotExist],
    ['Unhandled', unhandled, TestData.Unhandled],
    ['GoOnlineHookFailed', goOnlineHookFailed, TestData.GoOnlineHookFailed],
    ['GoOfflineHookFailed', goOfflineHookFailed, TestData.GoOfflineHookFailed],
    ['DiagnosticHookFailed', diagnosticHookFailed, TestData.DiagnosticHookFailed],
    ['OperationsHookFailed', operationsHookFailed, TestData.OperationsHookFailed],
    [
      'CannotOperateOnAnInFlightOrFinishedStep',
      cannotOperateOnAnInFlightOrFinishedStep,
      TestData.CannotOperateOnAnInFlightOrFinishedStep
    ]
  ])('%s', (_, actual, expected) => expect(actual).toEqual(expected))
})
