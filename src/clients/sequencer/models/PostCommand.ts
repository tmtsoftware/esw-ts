/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Sequence } from './Sequence'
import type { SequenceCommand } from '../../../models'

export class LoadSequence {
  _type: 'LoadSequence' = 'LoadSequence' as const

  constructor(readonly sequence: Sequence) {}
}

export class StartSequence {
  _type: 'StartSequence' = 'StartSequence' as const
}

export class Resume {
  _type: 'Resume' = 'Resume' as const
}

export class Pause {
  _type: 'Pause' = 'Pause' as const
}

export class Reset {
  _type: 'Reset' = 'Reset' as const
}

export class GetSequence {
  _type: 'GetSequence' = 'GetSequence' as const
}

export class IsAvailable {
  _type: 'IsAvailable' = 'IsAvailable' as const
}

export class IsOnline {
  _type: 'IsOnline' = 'IsOnline' as const
}

export class GoOnline {
  _type: 'GoOnline' = 'GoOnline' as const
}

export class GoOffline {
  _type: 'GoOffline' = 'GoOffline' as const
}

export class AbortSequence {
  _type: 'AbortSequence' = 'AbortSequence' as const
}

export class Stop {
  _type: 'Stop' = 'Stop' as const
}

export class OperationsMode {
  _type: 'OperationsMode' = 'OperationsMode' as const
}

export class Add {
  _type: 'Add' = 'Add' as const

  constructor(readonly commands: SequenceCommand[]) {}
}

export class Prepend {
  _type: 'Prepend' = 'Prepend' as const

  constructor(readonly commands: SequenceCommand[]) {}
}

export class Replace {
  _type: 'Replace' = 'Replace' as const

  constructor(
    readonly id: string,
    readonly commands: SequenceCommand[]
  ) {}
}

export class InsertAfter {
  _type: 'InsertAfter' = 'InsertAfter' as const

  constructor(
    readonly id: string,
    readonly commands: SequenceCommand[]
  ) {}
}

export class Delete {
  _type: 'Delete' = 'Delete' as const

  constructor(readonly id: string) {}
}

export class AddBreakpoint {
  _type: 'AddBreakpoint' = 'AddBreakpoint' as const

  constructor(readonly id: string) {}
}

export class RemoveBreakpoint {
  _type: 'RemoveBreakpoint' = 'RemoveBreakpoint' as const

  constructor(readonly id: string) {}
}

export class DiagnosticMode {
  _type: 'DiagnosticMode' = 'DiagnosticMode' as const
  readonly startTime: string

  constructor(
    startTime: Date,
    readonly hint: string
  ) {
    this.startTime = startTime.toJSON()
  }
}

export class Submit {
  _type: 'Submit' = 'Submit' as const

  constructor(readonly sequence: Sequence) {}
}

export class Query {
  _type: 'Query' = 'Query' as const

  constructor(readonly runId: string) {}
}

export class GetSequencerState {
  _type: 'GetSequencerState' = 'GetSequencerState' as const
}

export type SequencerPostRequest =
  | LoadSequence
  | StartSequence
  | Add
  | Prepend
  | Replace
  | InsertAfter
  | Delete
  | AddBreakpoint
  | RemoveBreakpoint
  | Reset
  | Resume
  | Pause
  | GetSequence
  | IsAvailable
  | IsOnline
  | GoOnline
  | GoOffline
  | AbortSequence
  | Stop
  | DiagnosticMode
  | OperationsMode
  | Submit
  | Query
  | GetSequencerState
