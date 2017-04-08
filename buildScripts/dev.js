const webpackMerge = require('webpack-merge')
const OfflinePlugin = require('offline-plugin')
const commonConfig = require('./base.js')

module.exports = (env, path, outputPath) => webpackMerge(commonConfig(path, outputPath), {
  devServer: {
    port: 3000,
    host: 'localhost',
    inline: true,
    contentBase: outputPath
  },
  plugins: [
    // According to the documentation, it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      AppCache: false
    }),
  ],
})
