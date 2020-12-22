import * as sinon from 'sinon'
import { LocationServiceImpl } from './LocationServiceImpl'

console.log('*************** mock **********')
export const LocationService = sinon.stub().returns(LocationServiceImpl)
