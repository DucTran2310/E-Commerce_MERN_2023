import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './'
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
  }
})