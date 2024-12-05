import {
  defineConfig,
  presetUno,
  presetAttributify,
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify({
      prefix: 'w:',
    }),
  ],
  theme: {
    colors: {
      loading: {
        bg: '#f4f5f9',
        text: 'rgb(221, 221, 221)',
      },
      'bar-bg': '#2b2c2d',
      'module-bg': '#1e1f20',
      // 'primary-text': '#3d4351',
      // 'regular-text': '#787b8a',
      // 'secondary-text': '#a0a4b7',
      // // 'thirdary-text': '',
      // blue: '#4777f4',
      // red: '#ff5265',
      // green: '#00b090',
    },
    breakpoints: {
      sm: '414px',
      md: '768px',
      lg: '1280px',
      xl: '1368px',
      '2xl': '1920px',
    },
  },
  rules: [
    ['font-pingf', {
      'font-family': 'PingFangSC-Regular, PingFang SC',
    }],
    ['font-pingf-medium', {
      'font-family': 'PingFangSC-Medium, PingFang SC',
    }],
    ['font-pingf-semibold', {
      'font-family': 'PingFangSC-Semibold, PingFang SC',
    }],
    ['font-same-width', {
      'font-family': 'Helvetica Neue, Helvetica',
    }],
  ],
})
