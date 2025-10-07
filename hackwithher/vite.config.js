import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Working config for Tailwind + React + Vite
export default defineConfig({
  plugins: [react()],
  base: './', // Important for Vercel
})
