import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
  ssr: {
    external: [
      '@tanstack/start-server-core',
      '@tanstack/start',
    ],
    noExternal: [
      '@tanstack/react-router',
    ],
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: false,
    rollupOptions: {
      external: [
        '@tanstack/start-server-core',
        '@tanstack/start',
      ],
    },
  },
})
