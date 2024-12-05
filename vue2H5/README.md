> todo:项目简介


#### 运行环境

- node 14.6.0
- npm包管理 pnpm
- 构建工具vue-cli4



#### 目录结构 (todo:需要根据项目实际情况调整一下目录结构)
```bash
.
├── README.md
├── babel.config.js
├── .browserslistrc
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── .env.produtest            # 测试环境变量
├── .eslintignore             # eslint忽略
├── .eslintrc.js
├── .gitignore
├── .npmrc                    # npm配置
├── jsconfig.json             # 别名设置以达到代码提示
├── package.json
├── pnpm-lock.yaml            # pnpm依赖lock
├── PROJECT_CONFIG.js         # 项目配置,部分属性修改后可能需要重新运行项目
├── public
├── src
│   ├── App.vue               # 根页面
│   ├── assets
│   │   ├── compressed        # 压缩图片输出  路径别名: @min/
│   │   ├── noCompression     # 无需压缩图片  路径别名: @/img/
│   │   └── original          # 需压缩的原图  路径别名: @origin/
│   ├── common
│   │   ├── apis              # 接口管理,可区分不同模块文件
│   │   ├── constant.js       # 常量
│   │   ├── request.js        # axios拦截封装
│   │   └── utils             # 工具库
│   ├── components
│   │   └── index.js          # 全局注册组件
│   ├── directives
│   │   └── index.js          # 全局指令
│   ├── filters
│   │   └── index.js          # 全局过滤器
│   ├── main.js               # 入口文件
│   ├── mixins                # mixins
│   ├── plugins               # 插件, 使用时直接import对应插件
│   ├── router                # 路由管理和拦截
│   ├── store                 # 状态管理
│   ├── styles
│   │   ├── abstracts         # 全局scss变量\函数\mixin, 需要在vue.config.js注入, 如果定义普通的样式会造成重复
│   │   ├── common.scss       # 原子类css, 参考taiwind
│   │   ├── reset.scss        # 重置类样式以保证默认样式在不同浏览器的统一
│   │   ├── app.scss          # 项目样式,全局生效
│   │   └── transition.scss   # transition
│   └── views
│       ├── About.vue         # todo:xxx页面
│       └── Home.vue          # todo:xxx页面
├── vue.config.js             # vuecli配置文件
├── upload                    # ssh2-sftp-client连接服务
│   ├── index.js
└── upload.config.js             # 部署上传配置
```

#### 开发和部署

安装依赖：

```bash
pnpm i

本地开发：

```bash
pnpm run dev
```

构建和发布：

```bash
pnpm run deploy
```


#### vue模板功能

- eslint约束及提交代码前检查
- 内置适配方案，自动转换样式中的px(支持转换rem)。注意：rem添加了对pc端的兼容(`src/plugins/amfe-flexible.js`)
- 切换方案修改`PROJECT_CONFIG.js`中的`ADAPTATION`
- 注入全局scss
- request拦截器
- 自动把指定名称开头的组件注册到全局
- 多环境配置
- tinypng压缩图片
- 微信分享,网页标题、描述、og:image
- 大数据统计
- 插件plugins
  - `amfe-flexible.js`, 根据适配方案判断是否需要动态设置html根字体大小
  - `cookie.js` 实际上就是js-cookie,默认不引入
  - `vant-ui.js` vant组件库,默认按需引入,不需要注释`src/main.js`中的import代码即可
  - `ding-share.js` 钉钉分享
  - `wechatShareConfig.js` 微信分享