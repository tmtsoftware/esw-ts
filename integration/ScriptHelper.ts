import { spawn } from 'child_process'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'

export const spawnServices = (serviceNames: ServiceName[]) => {
  const args = serviceNames.map((x) => `-s ${x}`)
  const process = spawn('sh', [
    '/Users/shubham/projects/tmtSoftware/gateway-tsclient/services.sh',
    'startServices',
    ...args
  ])

  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stdout.on('error', (data) => console.error(data.toString()))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const stopServices = async () => {
  const process = spawn('sh', [
    '/Users/shubham/projects/tmtSoftware/gateway-tsclient/stopServices.sh'
  ])

  process.stdout.on('data', (data) => console.log(data.toString()))
  await sleep(10000)
}
