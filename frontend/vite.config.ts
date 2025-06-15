// frontend/vite.config.ts

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    base: isDev ? "./" : "/static/build/",
    server: isDev
      ? {
          proxy: {
            "/api/": {
              target: env.VITE_API_BASE_URL ?? "http://localhost:8080",
              changeOrigin: true,
            },
          },
        }
      : undefined,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "../backend/app/static/build",
      emptyOutDir: true,
      manifest: true,
      sourcemap: isDev,
    },
  };
});
