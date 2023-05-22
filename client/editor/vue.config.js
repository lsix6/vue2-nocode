const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/editor/',
  outputDir: './dist/editor/',
  pages: {
    index: {
      entry: './src/start.js'
    }
  },
  devServer: {
    port: 9000,
    proxy: {
      '/nocode': {
        target: 'http://localhost:8000',
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
      '/lib/coms': {
        target: 'http://localhost:8200',
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
    }
  },
})
