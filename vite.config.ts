import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path differs per host:
//  - Vercel / local: served from root, so base = '/'
//  - GitHub Pages (project site): served from '/Finora-Platform/'
// Default to '/' and let the GitHub Pages workflow override via VITE_BASE.
export default defineConfig(() => ({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
}))
