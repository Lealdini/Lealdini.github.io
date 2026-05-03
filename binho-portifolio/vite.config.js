import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use a relative base so the build works on GitHub Pages user/project sites.
  base: './',

  // Static assets live under `assets/` instead of the legacy CRA `public/`.
  // (The old `public/index.html` would otherwise clobber the Vite-generated one.)
  publicDir: 'assets',

  plugins: [react()],

  // Many files in this codebase use the `.js` extension but contain JSX.
  // Tell esbuild to treat them as JSX so we don't have to rename them all
  // during the migration.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },

  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  preview: {
    port: 3000,
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    css: false,
  },
});
