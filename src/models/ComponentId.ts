import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'

export interface ComponentId {
  prefix: Prefix
  componentType: ComponentType
}

export const ComponentId = (prefix: Prefix, componentType: ComponentType) => {
  return { prefix, componentType }
}
