import { expect } from '@esm-bundle/chai'

export function sum(a: number, b: number) {
  return a + b
}

it('sums up 2 numbers', () => {
  expect(sum(1, 1)).to.equal(2)
  expect(sum(3, 12)).to.equal(15)
})
