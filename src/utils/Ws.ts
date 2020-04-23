import { GatewayCommand } from 'clients/command/models/GatewayCommand'

const createWebsocket = (host: string, port: number) =>
  new WebSocket(`ws://${host}:${port}/websocket-endpoint`)

export class Ws {
  public socket: Promise<WebSocket>

  constructor(host: string, port: number) {
    this.socket = new Promise((resolve, reject) => {
      const wss = createWebsocket(host, port)
      wss.onopen = () => {
        resolve(wss)
      }
      wss.onerror = (event: Event) => {
        reject({ message: 'error', ...event })
      }
    })
  }

  send(msg: GatewayCommand) {
    this.socket.then((wss) => wss.send(JSON.stringify(msg)))
  }

  subscribe<T>(cb: (msg: T) => void): Subscription {
    this.socket.then(
      (wss) =>
        (wss.onmessage = (event) => {
          const data: T = JSON.parse(event.data)
          cb(data)
        })
    )

    return {
      cancel: () => this.socket.then((wss) => wss.close)
    }
  }
}

// fixme
export interface Subscription {
  cancel: () => void
}