/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as D from 'io-ts/lib/Decoder'
import type { ComponentId } from '../models'
import { ComponentTypeD } from './ComponentTypeDecoder'
import type { Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'

export const ComponentIdD: Decoder<ComponentId> = D.struct({
  prefix: PrefixD,
  componentType: ComponentTypeD
})
