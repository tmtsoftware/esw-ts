import type { ComponentType } from '..'
import { ciLiteral, Decoder } from './Decoder'

export const ComponentTypeD: Decoder<ComponentType> = ciLiteral(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)
