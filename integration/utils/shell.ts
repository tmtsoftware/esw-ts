import { exec } from 'child_process'
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../../scripts')

export const servicesScript = path.resolve(scriptDir, 'services.sh')
export const componentScript = path.resolve(scriptDir, 'component.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')

const executeScript = (script: string) => (args: string[]) => {
  const cmd = [script, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  const child = exec(cmd.join(' '))

  if (child.stdout != null) child.stdout.pipe(process.stdout)

  return child
}

export const executeServicesScript = executeScript(servicesScript)
export const executeComponentScript = executeScript(componentScript)
export const executeStopServicesScript = executeScript(stopServicesScript)
