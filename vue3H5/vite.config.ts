import {
  defineConfig, UserConfig, loadEnv,
} from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { localeExcelToJson } from './vite-plugins/localeExcelToJson'
import { VantResolver } from '@vant/auto-import-resolver'

import setting from './src/settings'
import packagejson from './package.json'

const { port } = setting

export default defineConfig(({ command, mode }): UserConfig => {
  const env = loadEnv(mode, resolve(process.cwd(), './env'), '')
  const isTest = command === 'build' && mode === 'test'
  console.log(command, mode, env.VITE_ASSETS_PATH)
  return {
    base: env.VITE_ASSETS_PATH,
    define: {
      'process.version': JSON.stringify(packagejson.version),
      'process.client': true,
    },
    plugins: [
      basicSsl(),
      vue(),
      localeExcelToJson({
        input: './src/locale/translate.xlsx',
        ouput: './src/locale',
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: setting.title,
          },
        },
      }),
      AutoImport({
        resolvers: [ElementPlusResolver(), VantResolver()],
        imports: [
          'vue',
          'pinia',
          'vue-router',
          {
            '@/hooks/global/useBoolean': ['useBoolean'],
            '@/hooks/global/useOnResize': ['useOnResize'],
            '@/hooks/global/useSubmitLock': ['useSubmitLock'],
            '@/hooks/global/useToggle': ['useToggle'],
            '@/hooks/global/useLang': ['useLang'],
            '@/utils/index': [
              'isArray',
              'isObject',
              'isNull',
            ],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          globalsPropValue: true,
        },
        dts: true, // auto generation auto-imports.d.ts file
      }),
      Components({
        resolvers: [ElementPlusResolver(), VantResolver()],
      }),
      vueJsx(),
      createSvgIconsPlugin({
        // config svg dir that can config multi
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common')],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    // publicDir: 'public',
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src'),
      },
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
    css: {
      // modules: ,
      preprocessorOptions: {
        // define global scss variable
        scss: {
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },
    clearScreen: false,
    envDir: './env',
    server: {
      port,
      strictPort: true,
      https: true,
      // open: `https://local.jin10.com:${port}`,
      // proxy: {
      //   // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
      //   '/scala-ms': {
      //     target: 'http://shangchai.intranet.ruixiude.com:15980/',
      //     changeOrigin: true,
      //     secure: false
      //   }
      // }
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      hmr: {
        overlay: true,
      }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
    },
    build: {
      target: 'modules',
      sourcemap: false,
      // rollupOptions: {},
      // commonjsOptions: {},
      // dynamicImportVarsOptions: {},
      // 设置为 false 可以禁用压缩混淆。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。https://github.com/privatenumber/minification-benchmarks
      minify: isTest ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      reportCompressedSize: false,
      // 打包大小超过?kb警告
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['moment-mini'],
    },
  }
})
