import { AgentProvisionConfig, ProvisionConfig } from '../../../../src/clients/sequence-manager'
import { Prefix } from '../../../../src/models'

describe('Provision config', () => {
  test('cannot have multiple agent prefixes | ESW-365', () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const eswAgentConfig = new AgentProvisionConfig(eswAgentPrefix, 2)

    expect(() => new ProvisionConfig([eswAgentConfig, eswAgentConfig])).toThrow(
      Error(
        'Requirement failed - Invalid Provision config: Cannot have multiple entries for same agent prefix: Duplicate agents [ESW.agent1]'
      )
    )
  })
})

describe('Agent Provision config', () => {
  test('cannot have sequence component count less than or equal to 0 | ESW-365', () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')

    expect(() => new AgentProvisionConfig(eswAgentPrefix, -1)).toThrow(
      Error(
        'Requirement failed - Invalid sequence component count: Count of sequence components must be greater than or equal to Zero'
      )
    )
  })
})
