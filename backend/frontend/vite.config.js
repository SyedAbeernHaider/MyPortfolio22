import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Important for correct asset paths in production
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Only for local development
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Add this build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})