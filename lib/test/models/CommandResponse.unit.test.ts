import {
  CancelledResponse,
  CompletedResponse,
  ErrorResponse,
  InvalidResponse,
  LockedResponse,
  Result,
  StartedResponse,
  SubmitResponse
} from '../../src/models'
import {
  CancelledL,
  CompletedL,
  ErrorL,
  InvalidL,
  isNegative,
  LockedL,
  StartedL
} from '../../src/models/params/CommandResponse'

describe('CommandResponse', () => {
  const errorResponse: ErrorResponse = { _type: ErrorL, runId: '1234', message: 'error reponse' }
  const invalidResponse: InvalidResponse = {
    _type: InvalidL,
    runId: '1234',
    issue: { _type: 'AssemblyBusyIssue', reason: 'invalid response' }
  }
  const lockedResponse: LockedResponse = { _type: LockedL, runId: '1234' }
  const startedResponse: StartedResponse = { _type: StartedL, runId: '1234' }
  const completedResponse: CompletedResponse = {
    _type: CompletedL,
    runId: '1234',
    result: new Result()
  }
  const cancelledResponse: CancelledResponse = { _type: CancelledL, runId: '1234' }

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
