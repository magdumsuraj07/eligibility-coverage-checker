import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",
    globals: true
  },
  server: {
    port: 5173,
    proxy: {
      "/check-eligibility": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/health": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
