import { Ws } from './Ws'

export const WebSocketTransport = <T>(url: string): Ws<T> => {
  return new Ws(url)
}
