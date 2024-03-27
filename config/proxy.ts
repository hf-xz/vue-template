/**
 * 代理配置
 * ! 只在开发环境有效，生产环境请使用 Nginx 等代理
 */
import type { ProxyOptions } from 'vite'

export const proxy: Record<string, string | ProxyOptions> = {
  // '/example': {
  //   target: 'http://localhost:8001',
  //   changeOrigin: true,
  //   rewrite: (path) => path.replace(/^\/example/, '') // 添加这个将去掉路径中的 /example
  // }
}
