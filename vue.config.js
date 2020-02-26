const path = require('path')// 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  // 开发模式注释
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': '' // 将路径中多余的暗号 删除
        // }
      }
    }
  },

  chainWebpack: (config) => {
    // set第一个参数：设置的别名，第二个参数：设置的路径
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('routers', resolve('./src/routers'))
      .set('stores', resolve('./src/stores'))
      .set('views', resolve('./src/views'))
  }
}
