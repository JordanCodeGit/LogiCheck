import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  build: {
    outDir: 'extension/dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'extension/popup.html'),
        options: resolve(__dirname, 'extension/options.html'),
        background: resolve(__dirname, 'extension/background.js'),
        content: resolve(__dirname, 'extension/content.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
