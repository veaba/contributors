import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), svgLoader({
    defaultImport: 'raw'
  })],
  server: {
    port: 3000
  }
})
