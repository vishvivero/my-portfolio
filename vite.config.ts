import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [checker({ typescript: true })],
  worker: {},
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 1
      }
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three', 'lil-gui', 'stats.js'],
        }
      }
    }
  },
  server: {
    open: true,
    port: 1234,
    host: "localhost",
  },
});
