import { defineConfig } from 'tsup'
import { exec } from 'child_process'

export default defineConfig((options) => ({
  entry: {
    index: './src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  splitting: true,
  clean: !options.watch,
}))
