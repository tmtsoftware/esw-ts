import { spawn } from 'child_process'
import * as path from 'path'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'

export const spawnServices = (serviceNames: ServiceName[], componentConf?: string) => {
  let args = serviceNames.map((x) => `-s ${x}`)
  if (!!componentConf) {
    args = args.concat(['-c', componentConf])
  }
  const process = spawn('sh', [path.resolve(__dirname, '../services.sh'), 'startServices', ...args])

  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stdout.on('', (data) => console.log(data.toString()))
}

export const stopServices = () => {
  const process = spawn('sh', [path.resolve(__dirname, '../stopServices.sh')])

  process.stdout.on('data', (data) => console.log(data.toString()))
}
