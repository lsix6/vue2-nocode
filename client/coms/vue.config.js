const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/lib/coms/',
  outputDir: './dist/lib/coms/',
  configureWebpack: (config) => {
    config.externals = {
      'vue': 'Vue',
    };
  },
  devServer: {
    port: 8200,
    proxy: {
      '/nocode': {
        target: 'http://localhost:8000',
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
      '/editor': {
        target: 'http://localhost:9000',
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
    }
  },
})
