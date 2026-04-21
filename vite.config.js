import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/fmcsa': {
          target: 'https://mobile.fmcsa.dot.gov',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              console.log('[proxy] →', 'https://mobile.fmcsa.dot.gov' + proxyReq.path)
            })
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('[proxy] ←', proxyRes.statusCode, req.url)
            })
          },
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost')
            const apiPath = url.searchParams.get('path') ?? ''
            const apiKey = env.FMCSA_API_KEY ?? ''
            const rewritten = `/qc/services${apiPath}?webKey=${apiKey}`
            console.log('[proxy] rewrite →', rewritten)
            return rewritten
          },
        },
      },
    },
  }
})
