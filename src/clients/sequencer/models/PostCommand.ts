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

export const LoadSequence = (sequence: SequenceCommand[]): LoadSequence => ({
  _type: 'LoadSequence',
  sequence
})

export const StartSequence: StartSequence = { _type: 'StartSequence' }

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

export type SequencerPostRequest =
  | LoadSequence
  | StartSequence
  | Add
  | Prepend
  | Replace
  | InsertAfter
  | Delete
