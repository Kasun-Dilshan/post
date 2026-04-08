import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative URLs so builds work when hosted from a sub-path (e.g. GitHub Pages).
  base: './',
  plugins: [react()],
})
