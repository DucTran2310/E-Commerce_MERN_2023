import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
// import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  dotenv.config({ path: `.env.${mode}` });
  return {
    plugins: [
      react(),
      // reactRefresh()
    ],
    resolve: {
      alias: [
        { find: '~', replacement: '/src' },
        { find: '@utils', replacement: '/src/utils' },
        { find: '@actions', replacement: '/src/actions' },
        { find: '@apis', replacement: '/src/apis' },
        { find: '@assets', replacement: '/src/assets' },
        { find: '@components', replacement: '/src/components' },
        { find: '@pages', replacement: '/src/pages' },
        { find: '@reducers', replacement: '/src/reducers' },
        { find: '@sagas', replacement: '/src/sagas' },
        { find: '@store', replacement: '/src/store' },
      ]
    },
    // Đảm bảo cấu hình esbuild để xử lý các tệp .jsx
    esbuild: {
      // ...
      loaders: {
        '.js': 'jsx',
        '.jsx': 'jsx', // Cấu hình esbuild để xử lý tệp .jsx
      },
    },
  }
})