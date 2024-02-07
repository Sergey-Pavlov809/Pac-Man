import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    contributors: packageJson.contributors,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
      external: ['react'],
    },
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './src/config'),
      hooks: path.resolve(__dirname, './src/hooks'),
      pages: path.resolve(__dirname, './src/pages'),
      services: path.resolve(__dirname, './src/services'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      store: path.resolve(__dirname, './src/store'),
    },
  },
  plugins: [react()],
})
