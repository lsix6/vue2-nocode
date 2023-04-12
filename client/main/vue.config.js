const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src/start.js'
    }
  },
  devServer: {
    port: 8000,
    proxy: {
      '/lib/nocode': {
        target: 'http://localhost:8100',
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
