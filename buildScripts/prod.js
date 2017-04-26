const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const OfflinePlugin = require('offline-plugin')
const commonConfig = require('./base.js')

module.exports = (env, path, outputPath) => webpackMerge(commonConfig(path, outputPath), {
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //     minimize: true,
    //     debug: false
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false,
      sourceMap: true,
    }),

    // According to the documentation, it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      AppCache: false
    }),
  ],
})
