import * as D from 'io-ts/lib/Decoder'
import type { ComponentId } from '../models/ComponentId'
import { ComponentTypeD } from './ComponentTypeDecoder'
import type { Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'

export const ComponentIdD: Decoder<ComponentId> = D.type({
  prefix: PrefixD,
  componentType: ComponentTypeD
})
