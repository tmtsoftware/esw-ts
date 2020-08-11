import {
  extractHostPort,
  getPostEndPoint,
  getWebSocketEndPoint,
  requirement
} from '../../src/utils/Utils'

describe('Utils', () => {
  test('Passing requirement', () => {
    expect(() => requirement(true, 'pass')).not.toThrow()
  })

  test('Failing requirement', () => {
    expect(() => requirement(false, 'fail')).toThrow(new Error(`Requirement failed - fail`))
  })

  test('Extract host Port from a uri', () => {
    const uri = 'http://localhost:1234/auth'
    const { host, port } = extractHostPort(uri)
    expect(host).toEqual('localhost')
    expect(port).toEqual(1234)
  })

  test('Make Post endpoint from host and port', () => {
    const expectedUri = 'http://localhost:1234/post-endpoint'
    const uri = getPostEndPoint({ host: 'localhost', port: 1234 })
    expect(uri).toEqual(expectedUri)
  })

  test('Make web socket endpoint from host and port', () => {
    const expectedUri = 'ws://localhost:1234/websocket-endpoint'
    const uri = getWebSocketEndPoint({ host: 'localhost', port: 1234 })
    expect(uri).toEqual(expectedUri)
  })
})
