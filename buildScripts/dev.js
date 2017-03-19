const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')

module.exports = (env, path, outputPath) => webpackMerge(commonConfig(path, outputPath), {
  devServer: {
    port: 3000,
    host: 'localhost',
    inline: true,
  //   historyApiFallback: true,
  //   noInfo: false,
  //   stats: 'minimal',
  //   publicPath: '/',
    contentBase: outputPath
  }
})
