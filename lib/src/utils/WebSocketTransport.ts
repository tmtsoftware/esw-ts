import { Ws } from './Ws'

export type WebSocketTransport<T> = (host: string, port: number) => Promise<Ws<T>>

export const WebSocketTransport = async <T>(url: string): Promise<Ws<T>> => {
  return new Ws(url)
}
