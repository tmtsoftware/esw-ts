import sinon from 'sinon'
import type { Location } from '../../src/clients/location'
import { Prefix } from '../../src/models'
import { headOption } from '../../src/utils/Utils'

console.log('*************** mock **********')
const location: Location = {
  _type: 'HttpLocation',
  connection: {
    connectionType: 'http',
    prefix: new Prefix('CSW', 'filter'),
    componentType: 'Assembly'
  },
  uri: 'https://localhost:5432',
  metadata: {}
}

export const LocationServiceImpl = {
  resolve: sinon.stub().returns(Promise.resolve(headOption([location])))
}
