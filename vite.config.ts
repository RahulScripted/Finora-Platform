import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://rahulscripted.github.io/Finora-Platform/, so built asset
// URLs must be prefixed with the repo name. Dev server stays at root ('/').
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Finora-Platform/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
}))
