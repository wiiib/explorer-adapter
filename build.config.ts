import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'rollup',
      input: 'src/index',
      outDir: 'dist',
    },
    {
      name: 'resolvers',
      builder: 'rollup',
      input: 'src/resolvers/index',
      outDir: 'dist',
    },
  ],
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    esbuild: {
      target: 'es2019',
    },
  },
  declaration: true,
  externals: [
    '@voire/type-utils',
  ],
})
