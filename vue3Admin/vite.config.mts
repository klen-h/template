import {
  defineConfig, UserConfig, loadEnv,
} from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { inject, minify } from 'vite-plugin-parse-html'
// import vitePluginImport from 'vite-plugin-babel-import'
import AutoImport from 'unplugin-auto-import/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { md } from './vite-plugins/md'
import UnoCSS from 'unocss/vite'

import setting from './src/settings'
import packagejson from './package.json'

const { port } = setting

export default defineConfig(({ command, mode }): UserConfig => {
  const isDev = command === 'serve'
  const env = loadEnv(mode, resolve(process.cwd(), './env'), '')
  // const isTest = command === 'build' && mode === 'test'
  // const isProduction = command === 'build' && mode === 'production'
  console.log(command, mode, env.VITE_ASSETS_PATH)
  return {
    base: env.VITE_ASSETS_PATH,
    define: {
      'process.version': JSON.stringify(packagejson.version),
    },
    plugins: [
      basicSsl(),
      vue(),
      md(),
      inject({
        data: {
          title: setting.title,
        },
      }),
      minify({
        isMinify: true,
      }),
      UnoCSS(),
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'pinia',
          'vue-router',
          {
            '@/hooks/global/useBoolean': ['useBoolean'],
            '@/hooks/global/useOnResize': ['useOnResize'],
            '@/hooks/global/useSubmitLock': ['useSubmitLock'],
            '@/hooks/global/useToggle': ['useToggle'],
            '@/utils/index': [
              'showLoadingMessage',
              'showSucessMessage',
              'showErrorMessage',
              'showWarnMessage',
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
      vueJsx(),
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // }),
      // vitePluginImport([
      //   {
      //     libraryName: '@front-end/utils',
      //     libraryDirectory: 'lib',
      //     libraryChangeCase: 'camelCase',
      //     style: () => null,
      //     ignoreStyles: [],
      //   },
      // ]),
      createSvgIconsPlugin({
        // config svg dir that can config multi
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]',
      }),
      // https://blog.csdn.net/weixin_42067720/article/details/115579817
      ...isDev ? [viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: isDev,
        prodEnabled: false,
        logger: true,
      })] : [],
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
          additionalData: '@use "@/styles/variables.scss" as *;',
          api: 'modern-compiler',
        },
      },
      postcss: {
        // remove build charset warning
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    // json: {
    //   namedExports: true,
    //   stringify: false
    // },
    // esbuild: {},
    clearScreen: false,
    envDir: './env',
    server: {
      host: '0.0.0.0',
      port,
      strictPort: true,
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
      minify: 'terser',
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
      // include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
      include: [],
    },
  }
})
