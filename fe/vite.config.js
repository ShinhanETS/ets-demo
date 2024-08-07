import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost', // API 서버의 주소 (포트는 기본 80)
        changeOrigin: true, // 원본 출처 변경
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
