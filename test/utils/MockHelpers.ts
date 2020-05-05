import { Server } from 'mock-socket'

export const wsMockWithResolved = <T>(data: T, mockServer: Server) =>
  mockServer.on('connection', (socket) =>
    socket.on('message', () => socket.send(JSON.stringify(data)))
  )
