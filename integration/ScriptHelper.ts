import { spawn } from 'child_process'
import * as path from 'path'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'

export const spawnServices = (serviceNames: ServiceName[]) => {
  const args = serviceNames.map((x) => `-s ${x}`)
  const process = spawn('sh', [path.resolve(__dirname, '../services.sh'), 'startServices', ...args])

  process.stdout.on('data', (data) => console.log(data.toString()))
  // process.stdout.on('error', (data) => console.error(data.toString()))
}

export const spawnComponent = (conf: string) => {
  const process = spawn('sh', [
    path.resolve(__dirname, '../services.sh'),
    'startComponent',
    '--conf',
    conf
  ])

  process.stdout.on('data', (data) => console.log(data.toString()))
  // process.stdout.on('error', (data) => console.error(data.toString()))
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const stopServices = async () => {
  const process = spawn('sh', [path.resolve(__dirname, '../stopServices.sh')])

  process.stdout.on('data', (data) => console.log(data.toString()))
  await sleep(10000)
}
