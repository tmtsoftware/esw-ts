import { spawn } from 'child_process'
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../..')
const resourcesPath = path.resolve(scriptDir, 'tmt-backend/src/main/resources')

export const servicesScript = path.resolve(scriptDir, 'services.sh')
export const componentScript = path.resolve(scriptDir, 'component.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')

const executeScript = (script: string) => (args: string[]) => {
  const cmd = [script, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  return spawn('sh', cmd)
}

export const compConfAbsolutePath = (name: string) => path.resolve(resourcesPath, name)

export const executeServicesScript = executeScript(servicesScript)
export const executeComponentScript = executeScript(componentScript)
export const executeStopServices = executeScript(stopServicesScript)
