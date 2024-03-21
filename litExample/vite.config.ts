import { defineConfig } from 'vite'
import * as path from "path"
import { viteStaticCopy } from 'vite-plugin-static-copy';

const mode = process.env.NODE_ENV || "development"

const paths = {
  production: ``,
  development: `-dev`,
  test: `-test`
}
const vitePath = `public/vite${paths[mode]}/assets`

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        viteStaticCopy({
          targets: [
            {
              src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets/icons'),
              dest: path.resolve(__dirname, vitePath)
            }
          ],
          // https://github.com/vitejs/vite/issues/1231
          hook: 'writeBundle'
        })
      ]
    }
  },
})
