import { Either, getOrElse } from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'
import { Decoder } from './Decoder'

export const requirement = (assertion: boolean, msg: string) => {
  if (!assertion) throw Error(`Requirement failed - ${msg}`)
}

export const extractHostPort = (uri: string) => {
  const [host, _port] = uri.split('/')[2].split(':')
  const port = parseInt(_port)
  return { host, port }
}

export const getResponse = <A>(e: Either<D.DecodeError, A>): A =>
  getOrElse<D.DecodeError, A>((err) => {
    const msg = D.draw(err)
    throw Error('Right value not present, Error: ' + msg)
  })(e)

export const decoderFactory = <T>(decoder: Decoder<T>) => (data: unknown) =>
  getResponse(decoder.decode(data))
