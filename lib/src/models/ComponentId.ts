import { ComponentType } from './ComponentType'
import { Prefix, PrefixV } from './params/Prefix'

export class ComponentId {
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}

  toJSON() {
    return { prefix: PrefixV.encode(this.prefix), componentType: this.componentType }
  }
}
