import { exec, execSync } from 'child_process'
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../../scripts')

export const appsLauncherScript = path.resolve(scriptDir, 'appLauncher.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')

const executeScript = (script: string, appName = '', appVersion = '') => (args: string[]) => {
  const cmd = [script, appName, appVersion, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  const child = exec(cmd.join(' '))
  if (child.stdout != null) child.stdout.pipe(process.stdout)
  return child
}

const executeScriptSync = (script: string, appName = '', appVersion = '') => (args: string[]) => {
  const cmd = [script, appName, appVersion, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  execSync(cmd.join(' '))
}

const appLauncher = (name: string, version = 'master-SNAPSHOT') =>
  executeScript(appsLauncherScript, name, version)

const appLauncherSync = (name: string, version = 'master-SNAPSHOT') =>
  executeScriptSync(appsLauncherScript, name, version)

export const executeServicesScript = appLauncher('backend-testkit-services', 'af7a5a4cacbf')
export const executeComponentScript = appLauncher('backend-testkit-component')
export const executeSequencerScript = appLauncher('backend-testkit-sequencer')

export const executeStopServicesScript = executeScript(stopServicesScript) // fixme: make this executeScriptSync call
export const executeCswContract = appLauncherSync('csw-contract', 'b90e9ab')
export const executeEswContract = appLauncherSync('esw-contract', '2fff251649')
