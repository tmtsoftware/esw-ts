import { mocked } from 'ts-jest/utils'
import { SequencerService } from '../../../src/clients/sequencer'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import { resolveConnection } from '../../../src/config/Connections'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/sequencer/SequencerServiceImpl')
jest.mock('../../../src/config/Connections')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockResolveGateway = mocked(resolveConnection)
const mockImpl = mocked(SequencerServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const uri = { host: '123', port: 1234 }
const tokenFactory = () => 'validtoken'
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)
wsMockEndpoint.mockReturnValue(wsEndpoint)

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const seqServiceImpl = new SequencerServiceImpl(
  componentId,
  new HttpTransport(postEndpoint, tokenFactory),
  () => new Ws(wsEndpoint)
)
mockImpl.mockReturnValue(seqServiceImpl)

describe('Sequencer Service Factory', () => {
  test('create sequencer service', async () => {
    const a = await SequencerService(componentId, tokenFactory)

    expect(a).toEqual(seqServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
    expect(wsMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
