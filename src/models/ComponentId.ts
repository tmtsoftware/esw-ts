import { ComponentType } from './ComponentType'
import { Prefix } from './params/Prefix'

export class ComponentId {
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}
