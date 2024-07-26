// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {visualizer} from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import purgecss from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [react(), visualizer(), viteCompression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
