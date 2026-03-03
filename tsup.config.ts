import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    minify: false,
  },
  {
    entry: { browser: 'src/browser.ts' },
    format: ['esm'],
    dts: true,
    minify: true,
    target: 'esnext',
  },
]);
