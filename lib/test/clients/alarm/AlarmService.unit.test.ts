import { AlarmKey, AlarmService } from '../../../src/clients/alarm'
import { Prefix } from '../../../src/models'
import { Done, HttpLocation } from '../../../src/clients/location'
import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Post'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'

jest.mock('../../../src/utils/Post')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation = new HttpLocation(GatewayConnection, uri)

describe('Alarm service', () => {
  test('should set alarm severity for a given prefix | ESW-314', async () => {
    const alarmService = new AlarmService()
    const alarmKey = new AlarmKey(new Prefix('ESW', 'Comp1'), 'alarm1')
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce('Done')

    const done: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(done).toEqual('Done')
  })
})
