import { Result } from '../../src/models'
import {
  Cancelled,
  Completed,
  Error,
  Invalid,
  isNegative,
  Locked,
  Started,
  SubmitResponse
} from '../../src/models/params/CommandResponse'

describe('CommandResponse', () => {
  const errorResponse: Error = { _type: 'Error', runId: '1234', message: 'error response' }
  const invalidResponse: Invalid = {
    _type: 'Invalid',
    runId: '1234',
    issue: { _type: 'AssemblyBusyIssue', reason: 'invalid response' }
  }
  const lockedResponse: Locked = { _type: 'Locked', runId: '1234' }
  const startedResponse: Started = { _type: 'Started', runId: '1234' }
  const completedResponse: Completed = {
    _type: 'Completed',
    runId: '1234',
    result: new Result()
  }
  const cancelledResponse: Cancelled = { _type: 'Cancelled', runId: '1234' }

  test('should return true if negative response | ESW-344', () => {
    const responses: Map<SubmitResponse, boolean> = new Map()
    responses.set(errorResponse, true)
    responses.set(invalidResponse, true)
    responses.set(lockedResponse, true)
    responses.set(startedResponse, false)
    responses.set(completedResponse, false)
    responses.set(cancelledResponse, true)

    responses.forEach((assertion, response) => {
      expect(isNegative(response)).toEqual(assertion)
    })
  })
})
