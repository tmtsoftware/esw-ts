import { spawn } from 'child_process'
import * as path from 'path'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'

export const spawnServices = (serviceNames: ServiceName[], componentConf?: string) => {
  let args = serviceNames.map((x) => `-s ${x}`)
  if (!!componentConf) {
    args = args.concat(['-c', componentConf])
  }
  spawn('sh', [path.resolve(__dirname, '../services.sh'), 'startServices', ...args])
}

export const stopServices = () => spawn('sh', [path.resolve(__dirname, '../stopServices.sh')])
