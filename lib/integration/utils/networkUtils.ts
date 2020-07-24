import * as os from 'os'

export const getIPv4Address = () => {
  const interfaces = os.networkInterfaces()
  const en0IFaces = interfaces.en0 as os.NetworkInterfaceInfo[]
  const { address } = en0IFaces.filter((x) => x.family == 'IPv4')[0]
  return address
}
