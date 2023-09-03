/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { ciLiteral, Decoder } from './Decoder'
import type { ContainerLifecycleState, SupervisorLifecycleState } from '../models'

export const SupervisorLifecycleStateD: Decoder<SupervisorLifecycleState> = ciLiteral(
  'Idle',
  'Running',
  'RunningOffline',
  'Restart',
  'Shutdown',
  'Lock'
)
export const ContainerLifecycleStateD: Decoder<ContainerLifecycleState> = ciLiteral('Idle', 'Running')
