import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { AppConfig } from './src/config/AppConfig.js'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  base: `./`,
  build: {
    outDir: AppConfig.applicationName,
    rollupOptions: {
      input: ['./index.html']
    }
  },
  plugins: [react()]
})
