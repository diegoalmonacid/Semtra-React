import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL de tu backend
        changeOrigin: true              // Cambia el origen del host a la API
      },
    },
  },
})
