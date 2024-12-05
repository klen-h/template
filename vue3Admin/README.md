# vue3-admin-template

技术栈: vue3(setup-script)+vite+element-plus
node版本: 18.13.0

# 开发 ⚒⚒⚒

### 构建步骤
```bash
# 安装依赖
pnpm i

# 启动服务
pnpm run dev
```
### 构建与发布

```bash
# 构建测试环境
pnpm run build:test
# 构建生产环境
pnpm run build
```

### 其它

```bash
# 本地预览测试环境效果
pnpm run preview:test

# 本地预览生产环境效果
pnpm run preview

# 代码格式检查并自动修复
pnpm run lintfix
```

## 目录结构(todo)

```bash
.
├── .husky                         # git hook
├── .vscode                        # vscode setting
├── dist                           # 构建输出目录
├── env
│   ├── .env.development           # 开发环境配置
│   ├── .env.production            # 生产环境配置
│   └── .env.test                  # 测试环境配置
├── mock                           # 本地开发 mock
├── public                         # 静态资源服务文件夹
├── scripts                        # node 脚本集合
│   ├── log.js                     # 控制台 console 封装
│   ├── package.json
│   └── deploy
│       ├── push-tag.js            # 发布时打tag
├── src
│   ├── App.vue
│   ├── api                        # 接口
│   ├── assets                     # 图片资源
│   ├── components                 # 组件目录
│   │   └── index.ts               # 全局组件
│   ├── directives                 # 指令目录
│   │   └── index.ts               # 全局指令
│   ├── hooks                      # hooks
│   ├── icons                      # svg icon
│   ├── layout                     # 布局组件
│   ├── main.ts                    # 入口文件
│   ├── mixins                     # mixins
│   ├── mockProdServer.ts          # mock注册
│   ├── permission.ts              # 权限相关
│   ├── router                     # 路由
│   ├── settings.ts                # 项目设置
│   ├── shims-vue.d.ts
│   ├── store                      # 状态管理
│   ├── styles                     # 样式文件
│   ├── templates                  # 代码示例, 作为模板复制修改使用, 或直接配置为编辑器代码片段
│   ├── types                      # 类型声明
│   ├── utils                      # 工具库
│   └── views                      # todo: 页面说明
│       ├── page1
│       ├── page2
│       └── page3
├── .cz-config.js                  # git cz 配置
├── .eslintignore                  # eslint 忽略
├── .eslintrc.js                   # eslint 规则
├── .gitignore                     # git 忽略
├── .npmrc                         # npm registry设置
├── babel.config.js
├── index.html                     # 根 html
├── package.json
├── pnpm-lock.yaml                 # 依赖锁定
├── postcss.config.js
├── README.md
├── tsconfig.json                  # 编辑器编译配置
└── vite.config.ts                 # vite 配置文件
```

## 浏览器支持

注意：vue3 不再支持 IE 浏览器
