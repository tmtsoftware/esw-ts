export const requirement = (assertion: boolean, msg: string) => {
  if (!assertion) throw Error(`Requirement failed - ${msg}`)
}

export const extractHostPort = (uri: string) => {
  const [host, _port] = uri.split('/')[2].split(':')
  const port = parseInt(_port)
  return { host, port }
}
