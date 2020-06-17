import { exec } from 'child_process'
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../../scripts')

export const appsLauncherScript = path.resolve(scriptDir, 'appLauncher.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')

const executeScript = (script: string, appName = '') => (args: string[]) => {
  const cmd = [script, appName, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  const child = exec(cmd.join(' '))

  if (child.stdout != null) child.stdout.pipe(process.stdout)

  return child
}

export const executeServicesScript = executeScript(appsLauncherScript, 'backend-testkit-services')
export const executeComponentScript = executeScript(appsLauncherScript, 'backend-testkit-component')
export const executeSequencerScript = executeScript(appsLauncherScript, 'backend-testkit-sequencer')
export const executeStopServicesScript = executeScript(stopServicesScript)
