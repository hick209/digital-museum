/* eslint-disable no-console */
const path = require('path')

const webpack = require('webpack')
const webpackConfigs = require('../webpack.config')

const build = () => {
  // Build the project
  const buildConfig = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

  console.log(`Building project with '${buildConfig}' configuration`)
  webpack(webpackConfigs(buildConfig), () => console.info('Finished building project with WebPack'))
  return path.join('../output', buildConfig)
}


module.exports = { build }
