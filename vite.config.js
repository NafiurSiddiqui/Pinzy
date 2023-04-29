// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'login.php'),
        nested: resolve(__dirname, 'src/html/app.html'),
      },
    },
  },
});
