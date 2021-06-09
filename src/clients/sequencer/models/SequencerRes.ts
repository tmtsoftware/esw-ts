import type { Unhandled } from '../../../models'
import type { StepList } from './StepList'

export type Ok = {
  _type: 'Ok'
}

export type CannotOperateOnAnInFlightOrFinishedStep = {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export type IdDoesNotExist = {
  _type: 'IdDoesNotExist'
  id: string
}

export type GoOnlineHookFailed = {
  _type: 'GoOnlineHookFailed'
}

export type GoOfflineHookFailed = {
  _type: 'GoOfflineHookFailed'
}

export type DiagnosticHookFailed = {
  _type: 'DiagnosticHookFailed'
}

export type OperationsHookFailed = {
  _type: 'OperationsHookFailed'
}

/**
 * @category Sequencer Service
 */
export type OkOrUnhandledResponse = Ok | Unhandled
/**
 * @category Sequencer Service
 */
export type RemoveBreakpointResponse = OkOrUnhandledResponse | IdDoesNotExist
/**
 * @category Sequencer Service
 */
export type PauseResponse = OkOrUnhandledResponse | CannotOperateOnAnInFlightOrFinishedStep
/**
 * @category Sequencer Service
 */
export type GenericResponse =
  | OkOrUnhandledResponse
  | IdDoesNotExist
  | CannotOperateOnAnInFlightOrFinishedStep
/**
 * @category Sequencer Service
 */
export type GoOnlineResponse = OkOrUnhandledResponse | GoOnlineHookFailed
/**
 * @category Sequencer Service
 */
export type GoOfflineResponse = OkOrUnhandledResponse | GoOfflineHookFailed
/**
 * @category Sequencer Service
 */
export type DiagnosticModeResponse = Ok | DiagnosticHookFailed
/**
 * @category Sequencer Service
 */
export type OperationsModeResponse = Ok | OperationsHookFailed

/**
 * @category Sequencer Service
 */
export type SequencerState = {
  _type: 'Idle' | 'Processing' | 'Loaded' | 'Offline' | 'Running'
}

/**
 * @category Sequencer Service
 */
export type SequencerStateResponse = {
  _type: 'SequencerStateResponse'
  stepList: StepList
  sequencerState: SequencerState
}
