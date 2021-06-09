// eslint-disable-next-line import/no-nodejs-modules
import { exec, execSync } from 'child_process'
// eslint-disable-next-line import/no-nodejs-modules
import * as path from 'path'

const scriptDir = path.resolve(__dirname, '../../scripts')

export const appsLauncherScript = path.resolve(scriptDir, 'appLauncher.sh')
export const stopServicesScript = path.resolve(scriptDir, 'stopServices.sh')

const executeScript =
  (script: string, appName = '', appVersion = '') =>
  (args: string[]) => {
    const cmd = [script, appName, appVersion, ...args]
    console.log(`Executing cmd : ${cmd.join(' ')}`)

    const child = exec(cmd.join(' '))
    if (child.stdout != null) child.stdout.pipe(process.stdout)
    return child
  }

const executeScriptSync =
  (script: string, appName = '', appVersion = '') =>
  (args: string[]) => {
    const cmd = [script, appName, appVersion, ...args]
    console.log(`Executing cmd : ${cmd.join(' ')}`)

    execSync(cmd.join(' '))
  }

const appLauncher = (name: string, version = 'master-SNAPSHOT') =>
  executeScript(appsLauncherScript, name, version)

const appLauncherSync = (name: string, version = 'master-SNAPSHOT') =>
  executeScriptSync(appsLauncherScript, name, version)

// Put SHA of 10 characters to make it consistent with Git api for latest SHA
// This consistency avoids multiple jitpack triggers for same commit
const csw_sha = '33131de840'
const esw_sha = '73ffeb7cfb'

export const executeServicesScript = appLauncher('backend-testkit-services', esw_sha)
export const executeComponentScript = appLauncher('backend-testkit-component', esw_sha)
export const executeSequencerScript = appLauncher('backend-testkit-sequencer', esw_sha)

export const executeStopServicesScript = executeScript(stopServicesScript) // fixme: make this executeScriptSync call
export const executeCswContract = appLauncherSync('csw-contract', csw_sha)
export const executeEswContract = appLauncherSync('esw-contract', esw_sha)
