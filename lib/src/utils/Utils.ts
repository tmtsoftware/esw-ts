import * as E from 'fp-ts/lib/Either'
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

export const getResponse = <A>(e: E.Either<D.DecodeError, A>): A =>
  E.getOrElse<D.DecodeError, A>((err) => {
    throw Error(D.draw(err))
  })(e)

export const decoderFactory = <T>(decoder: Decoder<T>) => (data: unknown) =>
  getResponse(decoder.decode(data))
