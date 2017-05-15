const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const OfflinePlugin = require('offline-plugin')
const fs = require('fs')
const commonConfig = require('./base')

let version = undefined
try {
	version = require('child_process').execSync('git describe --tags').toString().trim()
	console.info(`Using git version ${version}`)
} catch (e) {
	version = JSON.parse(fs.readFileSync('package.json')).version
	console.info(`Using package version ${version}`)
}

module.exports = (env, path, outputPath) => webpackMerge(commonConfig(path, outputPath), {
	plugins: [
		// new webpack.LoaderOptionsPlugin({
		//     minimize: true,
		//     debug: false
		// }),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
			},
		}),

		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true,
			},
			compress: {
				screw_ie8: true,
				warnings: false,
			},
			comments: false,
			sourceMap: true,
		}),

		// According to the documentation, it's always better if OfflinePlugin is the last plugin added
		new OfflinePlugin({
			AppCache: false,
			updateStrategy: 'all',
			version,
			externals: [
				// The website font
				'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
			],
		}),
	],
})
