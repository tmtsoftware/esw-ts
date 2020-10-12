import type { Connection } from './Connection'

export type AkkaLocation = {
  _type: 'AkkaLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}

export type HttpLocation = {
  _type: 'HttpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}

export type TcpLocation = {
  _type: 'TcpLocation'
  connection: Connection
  uri: string
  metadata: Record<string, string>
}
export type Location = AkkaLocation | TcpLocation | HttpLocation
