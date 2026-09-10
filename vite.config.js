import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Deployment assumption: site lives at the root of the domain (soivant.co/).
  // If you ever deploy to a subdirectory, update this accordingly.
  base: '/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    // Warn if any chunk exceeds 500 kB — keep the bundle lean
    chunkSizeWarningLimit: 500,
  },
});
