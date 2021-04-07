import { Observe, Prefix, Step, StepList } from '../../../../src'

const hcdPrefix = new Prefix('IRIS', 'testHcd')
const observeCommand = new Observe(hcdPrefix, 'Observe-1')
const pendingStepWithoutBreakpoint: Step = {
  command: observeCommand,
  hasBreakpoint: false,
  id: 'some-id',
  status: { _type: 'Pending' }
}

const pendingStepWithBreakpoint: Step = {
  command: observeCommand,
  hasBreakpoint: true,
  id: 'some-id',
  status: { _type: 'Pending' }
}

const successStep: Step = {
  command: observeCommand,
  hasBreakpoint: false,
  id: 'some-id',
  status: { _type: 'Success' }
}

const failureStep: Step = {
  command: observeCommand,
  hasBreakpoint: false,
  id: 'some-id',
  status: { _type: 'Failure', message: 'failure message' }
}
describe('StepList toJSON', () => {
  it('should return object to be converted into JSON | ESW-454', () => {
    const stepList = new StepList([successStep])

    expect(stepList.toJSON()).toEqual([successStep])
  })
})
describe('StepList isPaused', () => {
  it('should return true if first step is pending and has breakpoint | ESW-454', () => {
    const stepList = new StepList([pendingStepWithBreakpoint])

    expect(stepList.isPaused()).toBeTruthy()
  })

  it('should return true if first step is successful and second step is pending and has breakpoint | ESW-454', () => {
    const stepList = new StepList([successStep, pendingStepWithBreakpoint])

    expect(stepList.isPaused()).toBeTruthy()
  })

  it("should return false if first step is successful and second step is pending but doesn't have breakpoint | ESW-454", () => {
    const stepList = new StepList([successStep, pendingStepWithoutBreakpoint])

    expect(stepList.isPaused()).toBeFalsy()
  })

  it('should return false if no step is Pending | ESW-454', () => {
    const stepList = new StepList([successStep, failureStep])

    expect(stepList.isPaused()).toBeFalsy()
  })

  it('should return false if stepList is empty | ESW-454', () => {
    const stepList = new StepList([])

    expect(stepList.isPaused()).toBeFalsy()
  })
})

describe('StepList isFailed', () => {
  it('should return true if any step is Failed | ESW-454', () => {
    const stepList = new StepList([successStep, failureStep])

    expect(stepList.isFailed()).toBeTruthy()
  })

  it('should return false if no steps are Failed | ESW-454', () => {
    const stepList = new StepList([successStep, pendingStepWithBreakpoint])

    expect(stepList.isFailed()).toBeFalsy()
  })

  it('should return false if stepList is empty | ESW-454', () => {
    const stepList = new StepList([])

    expect(stepList.isFailed()).toBeFalsy()
  })
})
