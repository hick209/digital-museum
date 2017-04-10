const path = require('path')

const webpack = require('webpack')
const webpackConfigs = require('./webpack.config')

const express = require('express')
const app = express()

// Build the project
const buildConfig = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
console.log(`Building project with '${buildConfig}' configuration`)
webpack(webpackConfigs(buildConfig), () => console.info('Finished building project with WebPack'))

// Setup paths
app.use('/', express.static('output/prod/'))
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'output/prod/index.html'))
})

// Start the server
const listener = app.listen(process.env.PORT || 80, () => {
  console.info(`Server started on port ${listener.address().port}!`)
})
