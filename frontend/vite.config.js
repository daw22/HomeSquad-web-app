import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  outDir: '../backend/dist'
  // proxy: {
  // '/': 'http://localhost:5000'
  // }
})
