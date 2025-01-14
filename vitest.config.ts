import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { UserConfigExport } from 'vitest/config'

const viteConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './')
    }
  }
}

const vitestConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.spec.ts'],
    setupFiles: ['./tests/setup.ts']
  }
}

export default defineConfig({
  ...viteConfig,
  ...vitestConfig
}) as UserConfigExport
