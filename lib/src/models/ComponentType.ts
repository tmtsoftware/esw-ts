import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../utils/Decoder'

export const ComponentType = ciLiteral(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)

export type ComponentType = D.TypeOf<typeof ComponentType>
