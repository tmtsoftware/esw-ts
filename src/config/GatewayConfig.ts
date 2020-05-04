import { ComponentType, Subsystem } from 'models'
export interface GatewayConfig {
  readonly subsystem: Subsystem
  readonly componentName: string
  readonly componentType: ComponentType
}

export const GatewayConfig: GatewayConfig = {
  subsystem: 'ESW',
  componentName: 'Gateway',
  componentType: 'Service'
}
