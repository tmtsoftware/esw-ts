import { AppConfig } from './src/config/AppConfig.js'
export default {
  devOptions: {
    port: 3000,
    bundle: false,
    open: 'none'
  },
  buildOptions: {
    clean: true,
    out: AppConfig.applicationName,
    sourcemap: true,
    baseUrl: '.'
  },
  optimize: {
    bundle: true
  },
  mount: {
    public: '/',
    src: '/dist'
  },
  plugins: [['@snowpack/plugin-typescript']],
  alias: {
    'io-ts/lib': 'io-ts/es6'
  }
}
