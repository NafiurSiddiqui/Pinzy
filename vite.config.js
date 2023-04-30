// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/html/index.html'),
        nested: resolve(__dirname, 'src/html/app.html'),
      },
    },
    minify: true,
    assetsInlineLimit: 0,
  },
});
