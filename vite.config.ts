import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vitest',
        {
          'vue-toastification': ['Toast', 'useToast']
        }
      ],
      dirs: ['src/stores'],
      dts: true
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [IconResolver()],
      dts: true
    }),
    Icons({
      autoInstall: true
    }),
    vuetify()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
  envDir: 'config'
})
