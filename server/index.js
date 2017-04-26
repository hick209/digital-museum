/* eslint-disable no-console */
const path = require('path')

const express = require('express')
const app = express()

const api = require('./api')
const appBuilder = require('./appBuilder')

const outputFolder = appBuilder.build()

// Setup paths
app.use('/', express.static(outputFolder))
app.use('/api', api)

app.get('*', (request, response) => {
	response.sendFile(path.join(outputFolder, 'index.html'))
})

// Start the server
const listener = app.listen(process.env.PORT || 80, () => {
	console.info(`Server started on port ${listener.address().port}!`)
})
