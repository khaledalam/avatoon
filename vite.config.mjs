import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: './src/index.ts',
      name: 'Avatoon',
      fileName: format => `Avatoon.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE',
          '@react-three/fiber': 'fiber',
          '@react-three/drei': 'drei',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
