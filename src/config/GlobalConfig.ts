const GLOBAL_CONFIG_PATH = '/config.js'

const CONFIG_KEYS = ['locationUrl'] as const

type GlobalConfig = Record<typeof CONFIG_KEYS[number], string>

export const loadGlobalConfig = async (): Promise<GlobalConfig> => {
  const globalConfig = <GlobalConfig>await import(GLOBAL_CONFIG_PATH)
  return globalConfig
}
