// eslint-disable-next-line import/no-mutable-exports
export let APPLICATION_NAME: string

export const setAppName = (name: string) => {
  APPLICATION_NAME = name
}

export const loadAppName = (): string => {
  if (APPLICATION_NAME != '') {
    return APPLICATION_NAME
  }

  throw new Error(
    `'applicationName' is a mandatory field. use setAppName() method to configure Application name.'`
  )
}
