import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  },
  server: {
    port: 3000
  },
  // Netlify specific configuration
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})