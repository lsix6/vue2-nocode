const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/lib/coms/',
  outputDir: './dist/lib/coms/',
  devServer: {
    port: 8200,
  },
})
