import { SequenceCommand } from 'models/params/Command'

export class LoadSequence {
  readonly _type: 'LoadSequence' = 'LoadSequence'
  constructor(readonly sequence: SequenceCommand[]) {}
}

export class StartSequence {
  readonly _type: 'StartSequence' = 'StartSequence'
}

export class Resume {
  readonly _type: 'Resume' = 'Resume'
}

export class Pause {
  readonly _type: 'Pause' = 'Pause'
}

export class Reset {
  readonly _type: 'Reset' = 'Reset'
}

export class GetSequence {
  readonly _type: 'GetSequence' = 'GetSequence'
}

export class IsAvailable {
  readonly _type: 'IsAvailable' = 'IsAvailable'
}

export class IsOnline {
  readonly _type: 'IsOnline' = 'IsOnline'
}

export class GoOnline {
  readonly _type: 'GoOnline' = 'GoOnline'
}

export class GoOffline {
  readonly _type: 'GoOffline' = 'GoOffline'
}

export class AbortSequence {
  readonly _type: 'AbortSequence' = 'AbortSequence'
}

export class Stop {
  readonly _type: 'Stop' = 'Stop'
}

export class OperationsMode {
  readonly _type: 'OperationsMode' = 'OperationsMode'
}

export class Add {
  readonly _type: 'Add' = 'Add'
  constructor(readonly commands: SequenceCommand[]) {}
}

export class Prepend {
  readonly _type: 'Prepend' = 'Prepend'
  constructor(readonly commands: SequenceCommand[]) {}
}

export class Replace {
  readonly _type: 'Replace' = 'Replace'
  constructor(readonly id: string, readonly commands: SequenceCommand[]) {}
}

export class InsertAfter {
  readonly _type: 'InsertAfter' = 'InsertAfter'
  constructor(readonly id: string, readonly commands: SequenceCommand[]) {}
}

export class Delete {
  readonly _type: 'Delete' = 'Delete'
  constructor(readonly id: string) {}
}

export class AddBreakpoint {
  readonly _type: 'AddBreakpoint' = 'AddBreakpoint'
  constructor(readonly id: string) {}
}

export class RemoveBreakpoint {
  readonly _type: 'RemoveBreakpoint' = 'RemoveBreakpoint'
  constructor(readonly id: string) {}
}

export class DiagnosticMode {
  readonly _type: 'DiagnosticMode' = 'DiagnosticMode'
  readonly startTime: string
  constructor(startTime: Date, readonly hint: string) {
    this.startTime = startTime.toJSON()
  }
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
