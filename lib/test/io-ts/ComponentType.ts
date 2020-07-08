import * as t from 'io-ts'

export const ComponentType = t.union([
  t.literal('HCD'),
  t.literal('Assembly'),
  t.literal('Service'),
  t.literal('Container'),
  t.literal('Sequencer'),
  t.literal('SequenceComponent'),
  t.literal('Machine')
])

export type ComponentType = t.TypeOf<typeof ComponentType>
