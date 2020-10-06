import type * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../utils/Decoder'

export const ComponentTypeD = ciLiteral(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)

/**
 * Represents a type of the Component.
 */
export type ComponentType = D.TypeOf<typeof ComponentTypeD>
