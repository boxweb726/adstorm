import { defineConfig } from 'vite';
import path from 'node:path';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(() => {
  return {
    server: {
      port: 1234,
    },
    appType: 'mpa',
    publicDir: 'public',
    root: resolve(__dirname, 'src'),
    resolve: {
      alias: [
        {
          find: '~pages',
          replacement: path.resolve(__dirname, '../../'),
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
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          about: resolve(__dirname, 'src/about/index.html'),
          portfolio: resolve(__dirname, 'src/portfolio/index.html'),
          detail: resolve(__dirname, 'src/portfolio/detail/index.html'),
          recruit: resolve(__dirname, 'src/recruit/index.html'),
          contact: resolve(__dirname, 'src/contact/index.html'),
        },
        output: {
          // 파일 이름을 설정합니다. 해시가 없는 이름을 사용합니다.
          // [name]은 청크 이름을 나타냅니다.
          // [hash] 또는 [contenthash]를 포함하지 않습니다.
          assetFileNames: (assetInfo) => {
            let result = 'images/[name][extname]';
            if (assetInfo.name.split('.')[1] === 'css')
              result = 'styles/[name][extname]';
            return result;
          },
          chunkFileNames: 'js/[name].js',
          entryFileNames: 'js/[name].js', // 엔트리 파일의 이름을 설정합니다.
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        fix: true,
      }),
      handlebars({
        partialDirectory: resolve(__dirname, './src/partials'),
      }),
    ],
  };
});
