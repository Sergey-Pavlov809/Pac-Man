import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import packageJson from './package.json'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    contributors: packageJson.contributors,
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
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        serviceWorker: './src/serviceWorker.ts',
      },
      output: {
        entryFileNames: assetInfo => {
          if (assetInfo.name === 'serviceWorker') {
            return '[name].js'
          }
          if (assetInfo.name === 'entry-server') {
            return 'entry-server.js'
          }
          return 'assets/js/[name]-[hash].js'
        },
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  ssr: {
    noExternal: ['gsap'],
  },
})
