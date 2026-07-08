import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The demo is deployed under the /avatoon/ path on GitHub Pages.
export default defineConfig({
  base: '/avatoon/',
  plugins: [react()],
  // Ensure a single React instance even though `avatoon` is a linked local
  // package — avoids the "invalid hook call" dual-React crash.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
