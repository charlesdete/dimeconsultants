import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '#tanstack-router-entry': path.resolve(__dirname, './src/tanstack-router-entry.ts'),
      '#tanstack-start-entry': path.resolve(__dirname, './src/tanstack-router-entry.ts'),
      '#tanstack-start-plugin-adapters': path.resolve(__dirname, './src/tanstack-router-entry.ts'),
      'tanstack-start-manifest:v': path.resolve(__dirname, './src/tanstack-start-manifest.ts'),
      'tanstack-start-injected-head-scripts:v': path.resolve(__dirname, './src/tanstack-start-injected-head-scripts.ts'),
    },
  },
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    tsConfigPaths(),
  ],
  optimizeDeps: {
    exclude: [
      '@tanstack/start-server-core',
      '@tanstack/start',
    ],
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: false,
  },
})
