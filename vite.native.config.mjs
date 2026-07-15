import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Native (React Native / Expo) bundle.
//
// Same entry and component tree as the web build, but `resolve.extensions`
// prioritises `.native.*` files so `../platform` resolves to
// `platform/index.native.tsx` (fiber/native + expo-av) instead of the web
// module. Every non-relative import is externalised, so the heavy native peers
// (fiber/native, drei/native, expo-*) are resolved from the consuming app and
// need not be installed here.
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [
      '.native.tsx',
      '.native.ts',
      '.native.jsx',
      '.native.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },
  build: {
    outDir: 'lib/native',
    emptyOutDir: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      // Externalise everything that isn't part of this package's own source.
      external: id => !id.startsWith('.') && !id.startsWith('/'),
    },
  },
});
