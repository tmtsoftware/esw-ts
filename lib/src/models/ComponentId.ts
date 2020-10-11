import * as D from 'io-ts/lib/Decoder'
import { PrefixD } from '../decoders/PrefixDecoder'
import type { Decoder } from '../utils/Decoder'
import { ComponentType, ComponentTypeD } from './ComponentType'
import type { Prefix } from './params/Prefix'
/**
 * Represents a component based on its prefix and type.
 * @class
 */
export class ComponentId {
  /**
   *  @param prefix represents the prefix (subsystem and name) of the component e.g. tcs.filter.wheel
   *  @param componentType represents a type of the Component e.g. Assembly, HCD, Sequencer etc
   *  @constructor
   */
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export const ComponentIdD: Decoder<ComponentId> = D.type({
  prefix: PrefixD,
  componentType: ComponentTypeD
})
