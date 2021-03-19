const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: '../apicloud',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	indexPath: 'index.html',
	// use the full build with in-browser compiler?
	// https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: (config) => {
		config.resolve.symlinks(true)
	},
	configureWebpack: config => {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_console: true, // console
						drop_debugger: true,
						pure_funcs: ['console.log']// 移除console
					}
				}
			})
		]
			/*,
		if(process.env.NODE_ENV === 'production'){
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
		}*/
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: IS_PROD,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
	      postcss: {
	        plugins: [
	          autoprefixer({
	            browsers: ['Android >= 4.0', 'iOS >= 7']
	          }),
	          pxtorem({
	            rootValue: 37.5,
	            propList: ['*'],
	          })
	        ]
	      }
	    },
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	// 是否启用dll
	// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		host: '0.0.0.0',
		port: 8888,
		https: false,
		hotOnly: false,
		proxy: null, // 设置代理
		before: app => {},
		overlay: {
            warnings: false,
            errors: false
        }
	},
	// 第三方插件配置
	pluginOptions: {
     
	}
}