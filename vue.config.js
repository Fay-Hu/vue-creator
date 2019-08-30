const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/': {
        // target: 'http://192.168.60.240:16088/',
        target: 'https://ccr.sifayun.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
    publicPath: process.env.VUE_APP_PUBLIC_PATH
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/styles/public.scss';`
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .tap(options =>
          merge(options, {
            limit: 10000
          })
      )

    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      // 开发环境
      .when(process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
      // 非开发环境
      .when(process.env.NODE_ENV !== 'development', config => {
        config.optimization
          .minimizer([
            new UglifyJsPlugin({
              uglifyOptions: {
                // 移除 console
                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                compress: {
                  // warnings: false,
                  drop_console: false,
                  drop_debugger: true,
                  pure_funcs: ['console.log']
                }
              }
            })
          ])

        if (process.env.VUE_APP_SYNC_FTP === true) {
            // ftp
          config.plugin('ftpSync').use(
              require.resolve('./webpack-plugin/webpack-sftp-client'),
            [{
              port: '22',
              host: '',
              username: '',
              password: '',
              path: './dist/',
              remotePath: process.env.VUE_APP_FTP_PATH,
              clearPath: 'static/',
                // Show details of uploading for files
              verbose: true
            }]
            )
        }
      })
  }
}
