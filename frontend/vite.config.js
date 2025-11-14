import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // Garante que todas as rotas apontem para index.html
      input: {
        main: './index.html'
      }
    }
  },
  // Configuração para lidar com rotas do React Router
  server: {
    historyApiFallback: true,
  }
})
