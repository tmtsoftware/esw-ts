// eslint-disable-next-line import/no-nodejs-modules
import * as os from 'os'

export const publicIPv4Address = () => {
  const publicIPv4Addresses = Object.values(os.networkInterfaces())
    .flatMap((i) => (i == undefined ? [] : i))
    .filter((info) => info.family == 'IPv4' && !info.internal)
    .map((info) => info.address)

  if (publicIPv4Addresses.length === 0) throw Error('No public IPv4 network interface found.')
  return publicIPv4Addresses[0]
}
