const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/lib/nocode/',
  outputDir: './dist/lib/nocode/',
  configureWebpack: (config) => {
    config.externals = {
      'vue': 'Vue',
    };
  },
  devServer: {
    port: 8100,
  },
})
