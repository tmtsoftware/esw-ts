import { mocked } from 'ts-jest/utils'
import { GATEWAY_CONNECTION } from '../../../src'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { SequencerService } from '../../../src/clients/sequencer'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/sequencer/SequencerServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveGateway = mocked(resolve)
const mockImpl = mocked(SequencerServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const tokenFactory = () => 'validtoken'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const seqServiceImpl = new SequencerServiceImpl(
  componentId,
  new HttpTransport(postEndpoint, { tokenFactory }),
  () => new Ws(wsEndpoint)
)
mockImpl.mockReturnValue(seqServiceImpl)

describe('Sequencer Service Factory', () => {
  test('create sequencer service', async () => {
    const a = await SequencerService(componentId, { tokenFactory })

    expect(a).toEqual(seqServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    // expect(postMockEndpoint).toBeCalledWith(uri)
    // expect(wsMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
