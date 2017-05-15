const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')

module.exports = (env, path, outputPath) => webpackMerge(commonConfig(path, outputPath), {
	devServer: {
		port: 3000,
		host: 'localhost',
		inline: true,
		contentBase: outputPath,
		historyApiFallback: true,

		proxy: {
			'/api': {
				target: 'http://localhost:80/',
				secure: false
			}
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'__DEBUG__': true,
		}),
	]
})
