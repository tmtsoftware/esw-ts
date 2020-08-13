import { WebSocketTransport } from '../../src/utils/WebSocketTransport'
import { mocked } from 'ts-jest/utils'
import { Ws } from '../../src/utils/Ws'

jest.mock('../../src/utils/Ws')
const mockWs = mocked(Ws)

describe('Websocket Transport', () => {
  test('should create web socket instance', () => {
    const ws = WebSocketTransport('ws://')
    expect(mockWs).toBeCalledWith('ws://')
    expect(ws).toBeInstanceOf(Ws)
  })
})
