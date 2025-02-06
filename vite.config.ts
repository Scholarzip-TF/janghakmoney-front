import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://43.201.207.68',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      }
    },
  },
});