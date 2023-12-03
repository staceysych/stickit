import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    assetsDir: "static/js",
  },
  server: {
    port: 3000,
    open: true,
  },
});
