import * as t from 'io-ts'
import { ComponentType } from './ComponentType'
import { PrefixIO } from './PrefixIO'

export const ComponentId = t.type({
  prefix: PrefixIO,
  componentType: ComponentType
})

export type ComponentId = t.TypeOf<typeof ComponentId>
