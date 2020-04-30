import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'

export class ComponentId {
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}
