let appName: string | undefined = undefined

export const setAppName = (name: string) => {
  if (appName !== undefined) {
    console.warn(`Failed to set app name to ${name}, Application Name is already set to ${appName}`)
  } else {
    appName = name
  }
}

export const getAppName = () => {
  if (appName === undefined || appName === '')
    throw Error('Application Name is not set, set it using setAppName function')
  return appName
}
