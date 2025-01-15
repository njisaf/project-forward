import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import preprocess from 'svelte-preprocess';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess({
        scss: {
          prependData: '@use "src/styles/init.scss" as *;'
        }
      })
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'module.json',
          dest: '.'
        }
      ]
    })
  ],
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
