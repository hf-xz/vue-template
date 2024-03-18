# README

这是一个基于 Vue 3 的模板项目，搭建过程可见[这里](https://hf-xz.github.io/articles/library/frontend/vue/)。

功能列表如下：

- 核心功能
  - Pinia： 状态管理
  - Vue Router： 路由管理
  - Vitest： 单元测试
  - Vuetify：组件库
- 实用功能
  - Eslint： 代码质量检测
  - Prettier： 代码格式化
  - 自动检查提交代码
  - 自动引入api、组件、图标
  - 自动剔除生产环境 `console.log`
- TODO
  - 网络请求封装
  - 应用配置加载

## 资源网站

- [Vuetify 组件库](https://vuetifyjs.com/zh-Hans/components/all/)
- [浏览器调试插件](https://devtools.vuejs.org)

## Problems

### 安装依赖后 eslint 报错

由于 yarn 的某些版本管理问题，本项目在添加新的依赖后，需要执行 `rm yarn.lock && yarn` 来使 eslint 相关的依赖版本正确。
