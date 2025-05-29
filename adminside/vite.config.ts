import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Разрешить доступ снаружи контейнера
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://db:8080', // Для локальной разработки
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});