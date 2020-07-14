import * as D from 'io-ts/lib/Decoder'
import { ComponentType, ComponentTypeD } from './ComponentType'
import { Prefix, PrefixD } from './params/Prefix'

export class ComponentId {
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export const ComponentIdD = D.type({
  prefix: PrefixD,
  componentType: ComponentTypeD
})

export type ComponentIdD = D.TypeOf<typeof ComponentIdD>
