import { SequenceCommand } from 'models/params/Command'

export interface LoadSequence {
  _type: 'LoadSequence'
  sequence: SequenceCommand[]
}

export const LoadSequence = (sequence: SequenceCommand[]): LoadSequence => ({
  _type: 'LoadSequence',
  sequence
})

export type SequencerPostRequest = LoadSequence
