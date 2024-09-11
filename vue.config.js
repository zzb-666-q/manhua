const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
        transpileDependencies: true,
        publicPath: './',
        // devServer: {
        //     host: 'localhost',
        //     port: 8080, // 端口号
        //     open: true, //运行后是否自动在浏览器打开
        // },
        pluginOptions: {
            "style-resources-loader": {
                preProcessor: "less",
                patterns: [
                    // 全局变量路径
                    path.resolve(__dirname, "./src/assets/css/global.less"),
                ],
            },
        },

    })
    // module.exports = {
    //     // devServer: {
    //     //   host: 'localhost',
    //     //   port: 8080, // 端口号
    //     //   open:true, //运行后是否自动在浏览器打开
    //     // },
    //     pluginOptions: {
    //         "style-resources-loader": {
    //             preProcessor: "less",
    //             patterns: [
    //                 // 全局变量路径
    //                 path.resolve(__dirname, "./src/assets/global.less"),
    //             ],
    //         },
    //     },


// }