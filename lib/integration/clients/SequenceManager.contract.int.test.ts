import 'whatwg-fetch'
import { ComponentId, Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { SequenceManagerService } from '../../src/clients/sequence-manager/SequenceManagerService'
import { getToken } from '../utils/auth'
import { ObsMode } from '../../src/clients/sequence-manager/models/ObsMode'

jest.setTimeout(80000)
let sequenceManagerService: SequenceManagerService
beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['AAS', 'SequenceManager'])
  const token = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  sequenceManagerService = await SequenceManagerService(() => token)
})

const sequencerComponentId = new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Sequence Manager Client ', () => {
  test('configure sequence components | ESW-365', async () => {
    const configureResponse = await sequenceManagerService.configure(new ObsMode('darknight'))

    expect(configureResponse).toEqual({
      _type: 'Success',
      masterSequencerComponentId: sequencerComponentId
    })
  })
})
