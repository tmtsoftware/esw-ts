import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import { AppConfig } from './src/config/AppConfig.js'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  base: `./`,
  build: {
    outDir: AppConfig.applicationName,
    rollupOptions: {
      input: ['./index.html']
    }
  },
  plugins: [reactRefresh()]
})
