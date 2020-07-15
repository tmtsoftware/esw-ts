import * as D from 'io-ts/lib/Decoder'
import { ComponentType } from './ComponentType'
import { Prefix, PrefixD } from './params/Prefix'

export class ComponentId {
  constructor(readonly prefix: Prefix, readonly componentType: ComponentType) {}
}

export const ComponentIdD: D.Decoder<unknown, ComponentId> = D.type({
  prefix: PrefixD,
  componentType: ComponentType
})
