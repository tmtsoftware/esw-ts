import { exec, execSync } from 'child_process'
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../../scripts')

export const appsLauncherScript = path.resolve(scriptDir, 'appLauncher.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')
export const contractGeneratorScript = path.resolve(scriptDir, 'contract-generator.sh')

const executeScript = (script: string, appName = '', appVersion = 'master-SNAPSHOT') => (
  args: string[]
) => {
  const cmd = [script, appName, appVersion, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  const child = exec(cmd.join(' '))
  if (child.stdout != null) child.stdout.pipe(process.stdout)
  return child
}

const executeScriptSync = (script: string, appName = '', appVersion = 'master-SNAPSHOT') => (
  args: string[]
) => {
  const cmd = [script, appName, appVersion, ...args]
  console.log(`Executing cmd : ${cmd.join(' ')}`)

  execSync(cmd.join(' '))
}

const backendTestKit = (name: string) => executeScript(appsLauncherScript, name, 'dc3ea77c4e')
export const executeServicesScript = backendTestKit('backend-testkit-services')
export const executeComponentScript = backendTestKit('backend-testkit-component')
export const executeSequencerScript = backendTestKit('backend-testkit-sequencer')

export const executeStopServicesScript = executeScriptSync(stopServicesScript)
export const executeCswContract = executeScriptSync(appsLauncherScript, 'csw-contract')
