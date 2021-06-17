const CONFIG_PATH = '/config.js'

const CONFIG_KEYS = ['locationUrl'] as const

type Config = Record<typeof CONFIG_KEYS[number], string>
type ConfigModule = { config: Config }

export const loadConfig = async (): Promise<Config> => {
  const module = <ConfigModule>await import(CONFIG_PATH)
  return module.config
}
