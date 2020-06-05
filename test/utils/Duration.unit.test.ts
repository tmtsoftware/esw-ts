import { Duration } from '../../src/clients/location/models/Duration'

describe('Duration', () => {
  test('should format on serialize', () => {
    expect(new Duration(10, 'seconds').toJSON()).toEqual('10 seconds')
  })
})
