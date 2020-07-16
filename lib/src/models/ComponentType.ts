import * as D from 'io-ts/lib/Decoder'
import { CaseInsensitiveLiteral } from '../utils/Decoder'

export const ComponentType = CaseInsensitiveLiteral(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)

export type ComponentType = D.TypeOf<typeof ComponentType>
