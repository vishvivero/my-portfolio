import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
        }
      }
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.json'],
}); 