import * as t from 'io-ts'

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
