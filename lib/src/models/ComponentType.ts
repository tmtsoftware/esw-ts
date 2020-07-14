import * as t from 'io-ts'
import * as D from 'io-ts/lib/Decoder'

export const ComponentType = t.keyof({
  HCD: null,
  Assembly: null,
  Service: null,
  Container: null,
  Sequencer: null,
  SequenceComponent: null,
  Machine: null
})

export type ComponentType = t.TypeOf<typeof ComponentType>

export const ComponentTypeD = D.literal(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)

export type ComponentTypeD = D.TypeOf<typeof ComponentTypeD>
