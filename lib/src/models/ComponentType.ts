import * as D from 'io-ts/lib/Decoder'

export const ComponentType = D.literal(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)

export type ComponentType = D.TypeOf<typeof ComponentType>
