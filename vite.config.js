import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'next/navigation': fileURLToPath(new URL('./src/mocks/next-navigation.js', import.meta.url)),
      'next/link': fileURLToPath(new URL('./src/mocks/next-link.jsx', import.meta.url)),
      'next/image': fileURLToPath(new URL('./src/mocks/next-image.jsx', import.meta.url)),
    },
  },
})
