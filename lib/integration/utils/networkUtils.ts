import * as os from 'os'

export const publicNIIp = () => {
  const interfaces = os.networkInterfaces()
  const ifaces = Object.values(interfaces)
  const address = ifaces.reduce((result, iface) => {
    if (iface)
      return iface.reduce((result, nIInfo) => {
        if (nIInfo.family == 'IPv4' && !nIInfo.internal) return nIInfo.address
        return result
      }, result)
    return result
  }, '')
  if (address.length == 0) throw Error('No public network interface for IPv4')
  return address
}
