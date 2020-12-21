import sinon from 'sinon'
import {LocationServiceImpl as api} from '../../src/clients/location/LocationServiceImpl'
import {HttpLocationD} from "../../src/decoders/LocationDecoders";
import {ciLiteral} from "../../src/decoders/Decoder";
import * as D from "io-ts/Decoder";
import {ComponentType, Prefix} from "../../src/models";

console.log('*************** mock **********')
const location = {
  _type: 'HttpLocation',
  connection: {
    connectionType: 'http',
    prefix: 'CSW.filter',
    componentType: 'Assembly'
  },
  uri: '5432',
  metadata: {}
}
export const LocationServiceImpl = sinon.createStubInstance(api,{
  resolve: () => Promise.resolve(undefined)
})



