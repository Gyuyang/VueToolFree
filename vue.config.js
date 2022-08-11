const { defineConfig } = require('@vue/cli-service')
// const { resolve } = require('core-js/library/fn/promise')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  // base:'./',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    open: true
  }
})
