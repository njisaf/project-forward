import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: 'src/index.js',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'foundry',
        /^@typhonjs-fvtt\/runtime\/.*/,
        /^svelte\/.*/
      ]
    }
  },
  server: {
    port: 30001,
    open: false
  }
});
