import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  // @ts-ignore
  plugins: [tsconfigPaths({ projects: ['tsconfig.test.json'] }), react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@sarcoinswap/wagmi/connectors/blocto': r('../../packages/wagmi/connectors/blocto/index.ts'),
      '@sarcoinswap/wagmi/connectors/trustWallet': r('../../packages/wagmi/connectors/trustWallet/index.ts'),
      '@sarcoinswap/uikit': r('../../packages/uikit/src'),
      '@sarcoinswap/localization': r('../../packages/localization/src'),
    },
  },
  test: {
    dangerouslyIgnoreUnhandledErrors: true, // this.WebSocketClass is not a constructor
    setupFiles: ['./vitest.setup.js'],
    environment: 'happy-dom',
    globals: true,
    exclude: ['src/config/__tests__', 'src/__tests__/gagues', 'node_modules'],
  },
})
