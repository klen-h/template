module.exports = {
  presets: ['@vue/app'],
  plugins: [
    // rollup的摇树机制,应该不需要插件处理按需引入
    // [
    //   'component',
    //   {
    //     libraryName: '@front-end/components',
    //     style: 'index.css'
    //   }
    // ]
  ],
}
