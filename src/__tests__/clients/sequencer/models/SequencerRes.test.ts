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
import * as SequencerRes from '__tests__/jsons/SequencerResponses.json'

test('Ok response', () => {
  const actualRes: Ok = { _type: 'Ok' }
  expect(actualRes).toEqual(SequencerRes.Ok)
})

test('CannotOperateOnAnInFlightOrFinishedStep response', () => {
  const actualRes: CannotOperateOnAnInFlightOrFinishedStep = {
    _type: 'CannotOperateOnAnInFlightOrFinishedStep'
  }
  expect(actualRes).toEqual(SequencerRes.CannotOperateOnAnInFlightOrFinishedStep)
})

test('IdDoesNotExist response', () => {
  const actualRes: IdDoesNotExist = {
    _type: 'IdDoesNotExist',
    id: 'id-1234'
  }
  expect(actualRes).toEqual(SequencerRes.IdDoesNotExist)
})

test('Unhandled response', () => {
  const actualRes: Unhandled = {
    _type: 'Unhandled',
    state: 'offline',
    messageType: 'StartSequence',
    msg: "Sequencer can not accept 'StartSequence' message in 'offline' state"
  }

  expect(actualRes).toEqual(SequencerRes.Unhandled)
})

test('GoOnlineHookFailed response', () => {
  const actualRes: GoOnlineHookFailed = {
    _type: 'GoOnlineHookFailed',
    msg: ''
  }
  expect(actualRes).toEqual(SequencerRes.GoOnlineHookFailed)
})

test('GoOfflineHookFailed response', () => {
  const actualRes: GoOfflineHookFailed = {
    _type: 'GoOfflineHookFailed',
    msg: ''
  }
  expect(actualRes).toEqual(SequencerRes.GoOfflineHookFailed)
})

test('DiagnosticHookFailed response', () => {
  const actualRes: DiagnosticHookFailed = {
    _type: 'DiagnosticHookFailed',
    msg: ''
  }
  expect(actualRes).toEqual(SequencerRes.DiagnosticHookFailed)
})

test('OperationsHookFailed response', () => {
  const actualRes: OperationsHookFailed = {
    _type: 'OperationsHookFailed',
    msg: ''
  }
  expect(actualRes).toEqual(SequencerRes.OperationsHookFailed)
})
