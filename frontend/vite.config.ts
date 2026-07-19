import { defineConfig } from 'vite'
import { shadowStyle } from 'vite-plugin-shadow-style'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  plugins: [react(), tailwindcss(), shadowStyle()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
