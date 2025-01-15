import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [svelte({
    preprocess: preprocess({
      scss: {
        prependData: '@use "src/styles/init.scss" as *;'
      }
    })
  })],
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
