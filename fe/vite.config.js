import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
        "/real": {
          target: env.VITE_REAL_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/real/, ""),
        },
        "/test": {
          target: env.VITE_TEST_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/test/, ""),
        },
      },
    },
  };
});
