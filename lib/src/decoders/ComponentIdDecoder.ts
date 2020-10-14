import * as D from 'io-ts/lib/Decoder'
import type { ComponentId } from '../models/ComponentId'
import type { Decoder } from '../utils/Decoder'
import { ComponentTypeD } from './ComponentTypeDecoder'
import { PrefixD } from './PrefixDecoder'

export const ComponentIdD: Decoder<ComponentId> = D.type({
  prefix: PrefixD,
  componentType: ComponentTypeD
})
