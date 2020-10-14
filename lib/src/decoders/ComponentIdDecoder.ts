import * as D from 'io-ts/Decoder'
import type { ComponentId } from '../models'
import type { Decoder } from '../utils/Decoder'
import { ComponentTypeD } from './ComponentTypeDecoder'
import { PrefixD } from './PrefixDecoder'

export const ComponentIdD: Decoder<ComponentId> = D.type({
  prefix: PrefixD,
  componentType: ComponentTypeD
})
