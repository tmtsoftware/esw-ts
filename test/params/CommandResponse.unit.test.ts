import * as Responses from 'jsons/CommandResponses.json'
import { Accepted, Cancelled, Completed, Error, Invalid, Locked, Started } from 'models'

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

  test('Locked', () => {
    const locked: Locked = {
      _type: 'Locked',
      runId: 'id-1234'
    }

    expect(locked).toEqual(Responses.Locked)
  })

  test('Started', () => {
    const started: Started = {
      _type: 'Started',
      runId: 'id-1234'
    }

    expect(started).toEqual(Responses.Started)
  })

  test('Completed', () => {
    const completed: Completed = {
      _type: 'Completed',
      runId: 'id-1234',
      result: { paramSet: [] }
    }

    expect(completed).toEqual(Responses.Completed)
  })

  test('Cancelled', () => {
    const cancelled: Cancelled = {
      _type: 'Cancelled',
      runId: 'id-1234'
    }

    expect(cancelled).toEqual(Responses.Cancelled)
  })

  test('Accepted', () => {
    const accepted: Accepted = {
      _type: 'Accepted',
      runId: 'id-1234'
    }

    expect(accepted).toEqual(Responses.Accepted)
  })
})
