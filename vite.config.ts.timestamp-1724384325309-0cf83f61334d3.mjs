// vite.config.ts
import { defineConfig } from "file:///E:/!projekty/!VUE/xddd/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/!projekty/!VUE/xddd/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///E:/!projekty/!VUE/xddd/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///E:/!projekty/!VUE/xddd/node_modules/unplugin-auto-import/dist/vite.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      /* options */
      dts: true,
      directoryAsNamespace: true
    }),
    AutoImport({
      /* options */
      dts: true,
      eslintrc: {
        enabled: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFwhcHJvamVrdHlcXFxcIVZVRVxcXFx4ZGRkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwhcHJvamVrdHlcXFxcIVZVRVxcXFx4ZGRkXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8hcHJvamVrdHkvIVZVRS94ZGRkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksXG4gICAgQ29tcG9uZW50cyh7IC8qIG9wdGlvbnMgKi9cbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxuICAgICB9KSxcbiAgICAgQXV0b0ltcG9ydCh7IC8qIG9wdGlvbnMgKi8gXG4gICAgICBkdHM6IHRydWUsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UCxTQUFTLG9CQUFvQjtBQUN6UixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFHdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQUMsSUFBSTtBQUFBLElBQ1osV0FBVztBQUFBO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxzQkFBc0I7QUFBQSxJQUN2QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUE7QUFBQSxNQUNWLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDSjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
