import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Deployment assumption: site lives at the root of the domain (geschichte.co/).
  // If you ever deploy to a subdirectory, update this accordingly.
  base: '/',
  server: {
    port: 5173,
    open: false,
    // Forwards /api/* to the Express backend during `npm run dev`, so the
    // frontend can call fetch('/api/waitlist') with no CORS configuration
    // needed locally. Start the backend separately with `npm run dev`
    // inside /server (see server/README or the chat guide).
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Warn if any chunk exceeds 500 kB — keep the bundle lean
    chunkSizeWarningLimit: 500,
  },
});
