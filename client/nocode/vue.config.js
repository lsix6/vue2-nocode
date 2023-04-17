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
      '/lib/coms': {
        target: 'http://localhost:8200',
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
    }
  },
})
