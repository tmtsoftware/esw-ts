import type * as D from 'io-ts/lib/Decoder'
import type { ComponentTypeD } from '../decoders/ComponentTypeDecoder'
/**
 * Represents a type of the Component.
 */
export type ComponentType = D.TypeOf<typeof ComponentTypeD>
