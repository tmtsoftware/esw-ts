import type * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/es6/Decoder'
import {
  extractHostPort,
  getOrThrow,
  getPostEndPoint,
  getWebSocketEndPoint,
  headOption,
  requirement
} from '../../src/utils/Utils'

describe('Utils', () => {
  describe('Requirement', () => {
    test('Passing requirement', () => {
      expect(() => requirement(true, 'pass')).not.toThrow()
    })

    test('Failing requirement', () => {
      expect(() => requirement(false, 'fail')).toThrow(new Error(`Requirement failed - fail`))
    })
  })

  test('Extract host Port from a uri', () => {
    const uri = 'http://localhost:1234/auth'
    const { host, port } = extractHostPort(uri)
    expect(host).toEqual('localhost')
    expect(port).toEqual(1234)
  })

  describe('Head Option', () => {
    test('Get value from option if value is present', () => {
      const b = ['some value']
      const value = headOption(b)

      expect(value).toEqual('some value')
    })
    test('Get undefined from option if value is not present', () => {
      const b: string[] = []
      const value = headOption(b)

      expect(value).toBeUndefined()
    })
  })

  describe('GetOrThrow', () => {
    test('Should get value from Either if value is captured inside either', () => {
      const either: E.Either<D.DecodeError, string> = D.string.decode('1234')
      const value = getOrThrow(either)

      expect(value).toEqual('1234')
    })

    test('Should throw Decode error if error is captured inside either', () => {
      const either: E.Either<D.DecodeError, string> = D.string.decode(1234)

      expect(() => getOrThrow(either)).toThrow('cannot decode 1234, should be string')
    })
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
