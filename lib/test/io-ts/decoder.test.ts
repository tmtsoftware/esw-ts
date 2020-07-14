import * as D from 'io-ts/lib/Decoder'

// input json to be decoded to Parameter class
const raw: unknown = {
  IntKey: {
    keyName: 'epoch',
    values: [1, 2, 3]
  }
}

const MakeKey = <KT extends string, KType>(kt: KT, decoder: D.Decoder<KType>) => {
  return D.type({
    [kt]: D.type({
      keyName: D.string,
      KeyType: decoder
    })
  })
}

// domain models
const IntKey = D.type({
  KeyTag: D.literal('IntKey'),
  KeyType: D.number
})

const IntKey1 = MakeKey<'IntKey', number>('IntKey', D.number)
type IntKey1 = D.TypeOf<typeof IntKey1>

const StringKey = D.type({
  KeyTag: D.literal('StringKey'),
  KeyType: D.string
})

type IntKey = D.TypeOf<typeof IntKey>
type StringKey = D.TypeOf<typeof StringKey>
