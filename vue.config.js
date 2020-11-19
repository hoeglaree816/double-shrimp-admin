const prod = process.env.NODE_ENV == 'production' ? true : false
// const webpack = require('webpack')

module.exports = {
    chainWebpack: config => {
        if (prod) {
            config.plugins.delete('prefetch') // 移除 prefetch 插件
            // config.plugin('banner').use(webpack.BannerPlugin, ['\r注重实践 扶助农工\r']) // 给各js头部添加注释
        }
    },
    configureWebpack: config => {
        config.output.filename = 'js/vue2.[hash].js' // 修改app.js的名称
        config.optimization.splitChunks.cacheGroups.vendors.name = 'vue2-vendors' // 修改chunk-vendor.js的名称
    },
    devServer: {
        port: 8081 // 端口
    },
    // filenameHashing: true // 开启生产模式文件哈希，便于控制缓存。
    productionSourceMap: false,// 关闭生产模式下sourcemap的生成
    publicPath:"./",//为了部署增加了这个设置
    css:{//为了部署增加了这个设置
        sourceMap:true,
        extract:false
    }
}
