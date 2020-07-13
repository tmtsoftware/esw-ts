import * as Responses from '../jsons/CommandResponses.json'

describe('Submit response', () => {
  test('Error | ESW-305', () => {
    const error = {
      _type: 'Error',
      runId: 'id-1234',
      message: 'Some reason'
    }

    expect(error).toEqual(Responses.Error)
  })

  test('Invalid | ESW-305', () => {
    const invalid = {
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
    const locked = {
      _type: 'Locked',
      runId: 'id-1234'
    }

    expect(locked).toEqual(Responses.Locked)
  })

  test('Started | ESW-305', () => {
    const started = {
      _type: 'Started',
      runId: 'id-1234'
    }

    expect(started).toEqual(Responses.Started)
  })

  test('Completed | ESW-305', () => {
    const completed = {
      _type: 'Completed',
      runId: 'id-1234',
      result: { paramSet: [] }
    }

    expect(completed).toEqual(Responses.Completed)
  })

  test('Cancelled | ESW-305', () => {
    const cancelled = {
      _type: 'Cancelled',
      runId: 'id-1234'
    }

    expect(cancelled).toEqual(Responses.Cancelled)
  })

  test('Accepted | ESW-305', () => {
    const accepted = {
      _type: 'Accepted',
      runId: 'id-1234'
    }

    expect(accepted).toEqual(Responses.Accepted)
  })
})
