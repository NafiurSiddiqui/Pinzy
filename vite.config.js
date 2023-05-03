// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // main: resolve(__dirname, '/index.html'),
        main: resolve(__dirname, 'src/js/app.js'),
        // nested: resolve(__dirname, 'src/html/pins.html'),
      },
    },
    minify: true,
    assetsInlineLimit: 0,
  },
});
