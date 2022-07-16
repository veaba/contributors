import { defineConfig } from 'vitest/config'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {},
  plugins: [vue(), svgLoader({
    defaultImport: 'raw'
  })],
  server: {
    port: 3000
  }
})
