import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost",
          changeOrigin: true,
        },
        "http://133.186.218.19/api": {
          target: env.VITE_REAL_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/\real/, ""),
        },
      },
    },
  };
});