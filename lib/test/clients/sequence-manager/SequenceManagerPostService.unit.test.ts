import { mockHttpTransport } from '../../helpers/MockHelpers'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { ObsMode } from '../../../src/clients/sequence-manager/models/ObsMode'
import { Configure } from '../../../src/clients/sequence-manager/models/PostCommand'
import { ConfigureResponseD } from '../../../src/clients/sequence-manager/models/SequenceManagerRes'
const requestRes: jest.Mock = jest.fn()
const sequenceManager = new SequenceManagerImpl(mockHttpTransport(requestRes))

describe('Sequence manager', function () {
  test('configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')
    await sequenceManager.configure(obsMode)

    expect(requestRes).toBeCalledWith(new Configure(obsMode), ConfigureResponseD)
  })
})
