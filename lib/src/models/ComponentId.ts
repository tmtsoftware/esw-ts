import type { ComponentType } from './ComponentType'
import type { Prefix } from './params/Prefix'

/**
 * Represents a component based on its prefix and type.
 * @class
 * @category Common
 */
export class ComponentId {
  /**
   *  @param prefix represents the prefix (subsystem and name) of the component e.g. tcs.filter.wheel
   *  @param componentType represents a type of the Component e.g. Assembly, HCD, Sequencer etc
   *  @constructor
   */
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}
