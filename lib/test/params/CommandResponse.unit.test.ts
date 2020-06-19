import * as Responses from '../jsons/CommandResponses.json'
import { Accepted, Cancelled, Completed, Error, Invalid, Locked, Started } from '../../src/models'

describe('Submit response', () => {
  test('Error | ESW-305', () => {
    const error: Error = {
      _type: 'Error',
      runId: 'id-1234',
      message: 'Some reason'
    }

    expect(error).toEqual(Responses.Error)
  })

  test('Invalid | ESW-305', () => {
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

  test('Locked | ESW-305', () => {
    const locked: Locked = {
      _type: 'Locked',
      runId: 'id-1234'
    }

    expect(locked).toEqual(Responses.Locked)
  })

  test('Started | ESW-305', () => {
    const started: Started = {
      _type: 'Started',
      runId: 'id-1234'
    }

    expect(started).toEqual(Responses.Started)
  })

  test('Completed | ESW-305', () => {
    const completed: Completed = {
      _type: 'Completed',
      runId: 'id-1234',
      result: { paramSet: [] }
    }

    expect(completed).toEqual(Responses.Completed)
  })

  test('Cancelled | ESW-305', () => {
    const cancelled: Cancelled = {
      _type: 'Cancelled',
      runId: 'id-1234'
    }

    expect(cancelled).toEqual(Responses.Cancelled)
  })

  test('Accepted | ESW-305', () => {
    const accepted: Accepted = {
      _type: 'Accepted',
      runId: 'id-1234'
    }

    expect(accepted).toEqual(Responses.Accepted)
  })
})
