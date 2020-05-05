import { Server } from 'mock-socket'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const wsMockWithResolved = (data: any, mockServer: Server) => {
  mockServer.on('connection', (socket) => {
    socket.on('message', () => socket.send(JSON.stringify(data)))
  })
}
