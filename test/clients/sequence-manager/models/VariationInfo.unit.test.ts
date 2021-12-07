import { ObsMode, Prefix, Variation } from '../../../../src'
import { VariationInfo } from '../../../../src/clients/sequence-manager/models/VariationInfo'

describe('VariationInfo', () => {
  test('create variationInfo from string | ESW-565', () => {
    const expectedVariationInfo = new VariationInfo('ESW', new Variation('red'))
    expect(VariationInfo.fromString('ESW.red')).toEqual(expectedVariationInfo)
  })

  test('create prefix from variationInfo & obsmode | ESW-565', () => {
    const variationInfo = new VariationInfo('ESW', new Variation('red'))
    expect(variationInfo.prefix(new ObsMode('Darknight'))).toEqual(new Prefix('ESW', 'Darknight.red'))
  })
})
