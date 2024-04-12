import { defineConfig } from 'vite';
import path from 'node:path';
import eslint from 'vite-plugin-eslint';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(() => {
  return {
    server: {
      port: 1234,
    },
    appType: 'mpa',
    publicDir: 'public',
    root: path.resolve(__dirname, 'src'),
    resolve: {
      alias: [
        {
          find: '~pages',
          replacement: path.resolve(__dirname, '../../'),
        },
        {
          find: '~page',
          replacement: path.resolve(__dirname, './src/page'),
        },
        {
          find: '~js',
          replacement: path.resolve(__dirname, './js'),
        },
        {
          find: '~css',
          replacement: path.resolve(__dirname, './css'),
        },
      ],
    },
    build: {
      outDir: '../dist',
      assetsInlineLimit: 0,
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
          about: path.resolve(__dirname, 'src/about/index.html'),
          portfolio: path.resolve(__dirname, 'src/portfolio/index.html'),
          detail: path.resolve(__dirname, 'src/portfolio/detail/index.html'),
          recruit: path.resolve(__dirname, 'src/recruit/index.html'),
          contact: path.resolve(__dirname, 'src/contact/index.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            console.log(assetInfo);
            let result = 'assets/[name][extname]';
            if (assetInfo.name.split('.')[1] === 'css') {
              result = 'styles/[name][extname]';
            }
            console.log(result);
            return result;
          },
          chunkFileNames: 'js/[name].js',
          entryFileNames: 'js/[name].js',
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        fix: true,
      }),
      handlebars({
        partialDirectory: path.resolve(__dirname, './src/partials'),
      }),
    ],
  };
});
