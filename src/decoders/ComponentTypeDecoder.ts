/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { ciLiteral, Decoder } from './Decoder'
import type { ComponentType } from '..'

export const ComponentTypeD: Decoder<ComponentType> = ciLiteral(
  'HCD',
  'Assembly',
  'Service',
  'Container',
  'Sequencer',
  'SequenceComponent',
  'Machine'
)
