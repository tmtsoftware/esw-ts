/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Lifecycle state of a container actor
 * @category Common
 */
export type ContainerLifecycleState = 'Idle' | 'Running'
/**
 * Lifecycle state of a Supervisor actor
 * @category Common
 */
export type SupervisorLifecycleState = 'Idle' | 'Running' | 'RunningOffline' | 'Restart' | 'Shutdown' | 'Lock'
