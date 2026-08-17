import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { igdbApi } from './server/igdb'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), igdbApi(env)],
  }
})
