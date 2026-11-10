import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base: the same build works on a custom domain and under
  // https://<user>.github.io/<repo>/ before the domain is connected.
  base: './',
})
