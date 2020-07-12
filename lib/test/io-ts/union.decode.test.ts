import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

test('Animal', () => {
  const Cat = t.type({
    tag: t.literal('Cat'),
    name: t.string
  })

  const Dog = t.type({
    tag: t.literal('Dog'),
    legs: t.string
  })

  const Monkey = t.type({
    tag: t.literal('Monkey'),
    eyes: t.string
  })

  const Tiger = t.type({
    tag: t.literal('Tiger'),
    tail: t.string
  })

  const Animal = t.union([Cat, Dog, Monkey, Tiger])

  // ===== Test ====
  const input = {
    tag: 'Tiger',
    name: 'Tommy'
  }

  console.log(PathReporter.report(Animal.decode(input)))
})
