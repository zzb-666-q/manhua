const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,//设置默认启动端口号
    open: true,//自动打开浏览器
    proxy: {
      '/apis': {   
        // target: 'http://127.0.0.1:9000',  // 接口域名
        target: "https://apis.netstart.cn/bcomic",  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        ws: true,  //是否跨域
        pathRewrite: {
          '^/apis': ''   //需要rewrite的,
        }
      }
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, './src/assets/css/global.less'),
      ],
    },
  },
});
