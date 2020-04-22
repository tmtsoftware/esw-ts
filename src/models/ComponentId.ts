import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'

export interface ComponentId {
  prefix: Prefix
  componentType: ComponentType
}
