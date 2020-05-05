const createWebsocket = (host: string, port: number, path = 'websocket-endpoint') =>
  new WebSocket(`ws://${host}:${port}/${path}`)

export class Ws<Req> {
  private socket: Promise<WebSocket>

  constructor(host: string, port: number) {
    this.socket = new Promise((resolve, reject) => {
      const wss = createWebsocket(host, port)
      wss.onopen = () => resolve(wss)
      wss.onerror = (event: Event) => reject({ message: 'error', ...event })
    })
  }

  private send(msg: Req): Promise<void> {
    return this.socket.then((wss) => wss.send(JSON.stringify(msg)))
  }

  private subscribeOnly<T>(cb: (msg: T) => void): Subscription {
    this.socket.then((wss) => (wss.onmessage = (event) => cb(JSON.parse(event.data))))

    return this.subscription
  }

  subscribe<T>(msg: Req, cb: (msg: T) => void): Subscription {
    this.send(msg).then(() => this.subscribeOnly(cb))
    return this.subscription
  }

  singleResponse<T>(msg: Req): Promise<T> {
    return new Promise<T>((resolve) => {
      this.subscribe(msg, (response: T) => resolve(response))
    })
  }

  private readonly subscription: Subscription = {
    cancel: () => this.socket.then((wss) => wss.close)
  }
}

// fixme
export interface Subscription {
  cancel: () => void
}
