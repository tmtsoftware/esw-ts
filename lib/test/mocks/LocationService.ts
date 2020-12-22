import * as sinon from 'sinon'
import { LocationServiceImpl } from './LocationServiceImpl'

export const LocationService = sinon.stub().returns(LocationServiceImpl)
