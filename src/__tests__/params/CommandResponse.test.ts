import { Error, Invalid } from 'models/params/CommandResponse'
import * as Responses from '__tests__/jsons/CommandResponses.json'

describe('Submit response', () => {
  test('Error', () => {
    const error: Error = {
      _type: 'Error',
      runId: 'id-1234',
      message: 'Some reason'
    }

    expect(error).toEqual(Responses.Error)
  })

  test('Invalid', () => {
    const invalid: Invalid = {
      _type: 'Invalid',
      runId: 'id-1234',
      issue: {
        _type: 'OtherIssue',
        reason: 'issue'
      }
    }

    expect(invalid).toEqual(Responses.Invalid)
  })
})
