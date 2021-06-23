import { setAppName } from '../../src/config'
import { loadAppName } from '../../src/config/AppName'

describe('App Name', () => {
  test('should be able to decode application name from config | ESW-312', async () => {
    const expected = 'test-app'
    setAppName('test-app')

    const config = loadAppName()
    expect(config).toEqual(expected)
  })

  test('should return unknown when application name does not exist | ESW-312', async () => {
    setAppName('')
    expect.assertions(1)

    expect(() => loadAppName()).toThrow(
      "'applicationName' is a mandatory field. use setAppName() method to configure Application name.'"
    )
  })
})
