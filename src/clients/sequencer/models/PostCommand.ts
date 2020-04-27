import { SequenceCommand } from 'models/params/Command'

export interface Sequence {
  _type: 'Sequence'
  commands: SequenceCommand[]
}

export const Sequence = (...commands: SequenceCommand[]): Sequence => ({
  _type: 'Sequence',
  commands: commands
})

export interface LoadSequence {
  _type: 'LoadSequence'
  sequence: Sequence
}

export const LoadSequence = (sequence: Sequence): LoadSequence => ({
  _type: 'LoadSequence',
  sequence
})

export type SequencerPostRequest = LoadSequence
