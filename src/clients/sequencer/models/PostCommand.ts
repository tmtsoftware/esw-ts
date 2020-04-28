import { SequenceCommand } from 'models/params/Command'

export interface LoadSequence {
  _type: 'LoadSequence'
  sequence: SequenceCommand[]
}

export interface StartSequence {
  _type: 'StartSequence'
}

export interface Add {
  _type: 'Add'
  commands: SequenceCommand[]
}

export interface Prepend {
  _type: 'Prepend'
  commands: SequenceCommand[]
}

export interface Replace {
  _type: 'Replace'
  id: string
  commands: SequenceCommand[]
}

export interface InsertAfter {
  _type: 'InsertAfter'
  id: string
  commands: SequenceCommand[]
}

export interface Delete {
  _type: 'Delete'
  id: string
}

export interface AddBreakpoint {
  _type: 'AddBreakpoint'
  id: string
}

export interface RemoveBreakpoint {
  _type: 'RemoveBreakpoint'
  id: string
}

export interface Reset {
  _type: 'Reset'
}

export interface Pause {
  _type: 'Pause'
}

export interface Resume {
  _type: 'Resume'
}

export interface GetSequence {
  _type: 'GetSequence'
}

export interface IsAvailable {
  _type: 'IsAvailable'
}

export interface IsOnline {
  _type: 'IsOnline'
}

export interface GoOnline {
  _type: 'GoOnline'
}

export interface GoOffline {
  _type: 'GoOffline'
}

export const LoadSequence = (sequence: SequenceCommand[]): LoadSequence => ({
  _type: 'LoadSequence',
  sequence
})

export const StartSequence: StartSequence = { _type: 'StartSequence' }
export const Resume: Resume = { _type: 'Resume' }
export const Pause: Pause = { _type: 'Pause' }
export const Reset: Reset = { _type: 'Reset' }
export const GetSequence: GetSequence = { _type: 'GetSequence' }
export const IsAvailable: IsAvailable = { _type: 'IsAvailable' }
export const IsOnline: IsOnline = { _type: 'IsOnline' }
export const GoOnline: GoOnline = { _type: 'GoOnline' }
export const GoOffline: GoOffline = { _type: 'GoOffline' }

export const Add = (commands: SequenceCommand[]): Add => ({
  _type: 'Add',
  commands
})

export const Prepend = (commands: SequenceCommand[]): Prepend => ({
  _type: 'Prepend',
  commands
})

export const Replace = (id: string, commands: SequenceCommand[]): Replace => ({
  _type: 'Replace',
  id,
  commands
})

export const InsertAfter = (id: string, commands: SequenceCommand[]): InsertAfter => ({
  _type: 'InsertAfter',
  id,
  commands
})

export const Delete = (id: string): Delete => ({
  _type: 'Delete',
  id
})

export const AddBreakpoint = (id: string): AddBreakpoint => ({
  _type: 'AddBreakpoint',
  id
})

export const RemoveBreakpoint = (id: string): RemoveBreakpoint => ({
  _type: 'RemoveBreakpoint',
  id
})

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
