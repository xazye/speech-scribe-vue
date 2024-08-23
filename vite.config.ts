import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    Components({ /* options */
      dts: true,
      dirs: ['src/components','src/components/ui'],
      deep: true,
    }),
    AutoImport({ /* options */ 
      imports: [
        'vue',
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
