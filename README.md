# README

这是一个基于 Vue 3 的模板项目，搭建过程可见[这里](https://hf-xz.github.io/articles/library/frontend/vue/)。

功能列表如下：

- 核心功能
  - Pinia： 状态管理
  - Vue Router： 路由管理
  - Vitest： 单元测试
  - Vuetify：组件库
  - Axios: 网络请求（已封装为 API 类）
- 实用功能
  - Eslint： 代码质量检测
  - Prettier： 代码格式化
  - 自动检查提交代码
  - 自动引入api、组件、图标
  - 自动剔除生产环境 `console.log`
  - 加载环境变量作为配置

## 开发指南

### 网络请求：API 与 代理

本项目将 axios 封装了一个 `API` 类，在 [src/apis/API.ts](src/apis/API.ts)

使用时需要在 [src/apis/index.ts](src/apis/index.ts)，声明一个 API 实例，这个实例会在项目中被自动引入。

为了解决跨域问题，本项目在 [config/proxy.ts](config/proxy.ts) 里配置了开发环境的代理，在这里定义的代理可以作为
`axiosOptions.baseURL` 传入 API 实例，这样这个实例的所有请求都会发往配置好的代理地址。

## 资源网站

- [Vuetify 组件库](https://vuetifyjs.com/zh-Hans/components/all/)
- [浏览器调试插件](https://devtools.vuejs.org)

## Problems

### 安装依赖后 eslint 报错

由于 yarn 的某些版本管理问题，本项目在添加新的依赖后，需要执行 `rm yarn.lock && yarn` 来使 eslint 相关的依赖版本正确。
