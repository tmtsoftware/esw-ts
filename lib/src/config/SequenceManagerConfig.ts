import { ComponentType, Subsystem } from '../models'
export interface SequenceManagerConfig {
  readonly subsystem: Subsystem
  readonly componentName: string
  readonly componentType: ComponentType
}

export const SequenceManagerConfig: SequenceManagerConfig = {
  subsystem: 'ESW',
  componentName: 'sequence_manager',
  componentType: 'Service'
}
